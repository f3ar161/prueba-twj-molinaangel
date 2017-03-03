/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  home: function (req, res) {
    return res.view('Vistas/home');
  },
  crearMateria: function (req, res) {
    return res.view('Vistas/Materia/crearMateria');
  },
  error: function (req, res) {
    return res.view('Vistas/Error', {
      error: {
        desripcion: "Usted esta por error en esta Ruta dirijase a Inicio",
        rawError: "Ruta equivocada",
        url: "/Inicio"
      }
    });
  },
  listarMateria: function (req, res) {
    Materia.find()
      .exec(function (errorIndefinido, materiasEncontrados) {
        if (errorIndefinido) {
          res.view('Vistas/Error', {
            error: {
              desripcion: "Hubo un problema cargando las materias",
              rawError: errorIndefinido,
              url: "/ListarMateria"
            }
          });
        }
        res.view('Vistas/Materia/ListarMateria', {
          materias: materiasEncontrados
        });
      })
  },
  editarMateria: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Materia.findOne({
        id: parametros.id
      }).exec(function (errorInesperado, MateriaEncontrado) {
        if (errorInesperado) {
          return res.view('Vistas/Error', {
            error: {
              desripcion: "Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarMateria"
            }
          });
        }
        if(MateriaEncontrado){
          return res.view("Vistas/Materia/editarMateria",{
            materiaAEditar:MateriaEncontrado,
            inicioSesion:true
          });
        }else{
          return res.view('Vistas/Error', {
            error: {
              desripcion: "La materia con id: "+parametros.id+" no existe.",
              rawError: "No existe la materia",
              url: "/ListarMateria"
            }
          });
        }
      })
    } else {
      return res.view('Vistas/Error', {
        error: {
          desripcion: "No ha enviado el parametro ID",
          rawError: "Faltan Parametros",
          url: "/ListarMateria"
        }
      });
    }
  },
  crearGrupo: function (req, res) {
    Materia.find()
      .exec(function (errorIndefinido, materiasEncontrados) {
          if (errorIndefinido) {
            res.view('Vistas/Error', {
              error: {
                desripcion: "Hubo un problema cargando las materias",
                rawError: errorIndefinido,
                url: "/CrearGrupo"
              }
            });
          }
        return res.view('Vistas/Grupo/crearGrupo' , {
          materias: materiasEncontrados
        });
      });

  },
  listarGrupo: function (req, res) {
    Grupo.find()
      .exec(function (errorIndefinido, gruposEncontrados) {
        if (errorIndefinido) {
          res.view('Vistas/Error', {
            error1: {
              desripcion: "Hubo un problema cargando los grupos",
              rawError: errorIndefinido,
              url: "/ListarGrupos"
            }
          });
        }
        res.view('Vistas/Grupo/ListarGrupo', {
          grupos: gruposEncontrados
        });
      })
  },
  editarGrupo: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Grupo.findOne({
        id: parametros.id
      }).exec(function (errorInesperado, GrupoEncontrado) {
        if (errorInesperado) {
          return res.view('Vistas/Error', {
            error: {
              desripcion: "Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarGrupo"
            }
          });
        }
        Materia.find()
          .exec(function (errorIndefinido, materiasEncontrados) {
            if (errorIndefinido) {
              res.view('Vistas/Error', {
                error: {
                  desripcion: "Hubo un problema cargando las materias",
                  rawError: errorIndefinido,
                  url: "/editarGrupo"
                }
              });
            }
            if(GrupoEncontrado){
              return res.view("Vistas/Grupo/editarGrupo",{
                grupoAEditar:GrupoEncontrado,
                materias: materiasEncontrados,
                inicioSesion:true
              });
            }else{
              return res.view('Vistas/Error', {
                error: {
                  desripcion: "El grupo con id: "+parametros.id+" no existe.",
                  rawError: "No existe el grupo",
                  url: "/ListarGrupo"
                }
              });
            }
          });
      })
    } else {
      return res.view('Vistas/Error', {
        error: {
          desripcion: "No ha enviado el parametro ID",
          rawError: "Faltan Parametros",
          url: "/ListarGrupos"
        }
      });
    }
  }
};

