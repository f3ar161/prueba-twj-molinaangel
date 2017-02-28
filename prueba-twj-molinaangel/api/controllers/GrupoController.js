/**
 * GrupoController
 *
 * @description :: Server-side logic for managing Grupoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearGrupo: function (req, res) {
    if (req.method == "POST") {
      var parametros = req.allParams();
      if (parametros.nombreGrupo && parametros.numeroMaximoEstudiantes) {
        var grupoCrear = {
          nombreGrupo: parametros.nombreGrupo,
          numeroMaximoEstudiantes: parametros.numeroMaximoEstudiantes,
          materias: parametros.materias.id
        }
        if (grupoCrear.nombreGrupo == "") {
          delete grupoCrear.nombreGrupo
        }
        Grupo.create(grupoCrear).exec(function (err, grupoCreado) {
          if (err) {
            return res.view('Vistas/Error', {
              error: {
                desripcion: "Fallo al crear grupo",
                rawError: err,
                url: "/CrearGrupo"
              }
            });
          }
          Grupo.find()
            .exec(function (errorIndefinido, gruposEncontrados) {
              if (errorIndefinido) {
                res.view('Vistas/Error', {
                  error: {
                    desripcion: "Hubo un problema cargando los grupos",
                    rawError: errorIndefinido,
                    url: "/ListarGrupo"
                  }
                });
              }
              res.view('Vistas/Grupo/ListarGrupo', {
                grupos: gruposEncontrados
              });
            })
        })
      } else {
        return res.view('Vistas/Error', {
          error: {
            desripcion: "Llena todos los parametros",
            rawError: "Fallo en envio de parametros",
            url: "/CrearGrupo"
          }
        });
      }
    } else {
      return res.view('Vistas/Error', {
        error: {
          desripcion: "Error en el uso del Metodo HTTP",
          rawError: "HTTP Invalido",
          url: "/CrearGrupo"
        }
      });
    }
  },
  BorrarGrupo: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Grupo.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, GrupoRemovido) {
        if (errorInesperado) {
          return res.view('Vistas/Error', {
            error: {
              desripcion: "Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarGrupo"
            }
          });
        }
        Grupo.find()
          .exec(function (errorIndefinido, gruposEncontrados) {
            if (errorIndefinido) {
              res.view('Vistas/Error', {
                error: {
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
      })

    } else {
      return res.view('Vistas/Error', {
        error: {
          desripcion: "Necesitamos el ID para borrar el grupo",
          rawError: "No envia ID",
          url: "/ListarGrupo"
        }
      });
    }
  },
  editarGrupo: function (req, res) {
    var parametros = req.allParams();
    if (parametros.idGrupo && (parametros.nombreGrupo || parametros.numeroMaximoEstudiantes || parametros.materias)) {
      var grupoAEditar = {
        nombreGrupo: parametros.nombreGrupo,
        numeroMaximoEstudiantes: parametros.numeroMaximoEstudiantes
      }
      if (grupoAEditar.nombreGrupo == "") {
        delete grupoAEditar.nombreGrupo
      }
      if (grupoAEditar.numeroMaximoEstudiantes == "") {
        delete grupoAEditar.numeroMaximoEstudiantes
      }
      if (grupoAEditar.materias == "") {
        delete grupoAEditar.materias
      }
      Grupo.update({
        id: parametros.idGrupo
      }, grupoAEditar)
        .exec(function (errorInesperado, GrupoRemovido) {
          if (errorInesperado) {
            return res.view('Vistas/Error', {
              error: {
                desripcion: "Error Inesperado",
                rawError: errorInesperado,
                url: "/ListarGrupo"
              }
            });
          }
          Grupo.find()
            .exec(function (errorIndefinido, gruposEncontrados) {
              if (errorIndefinido) {
                res.view('Vistas/Error', {
                  error: {
                    desripcion: "Hubo un problema cargando los grupos",
                    rawError: errorIndefinido,
                    url: "/ListarGrupo"
                  }
                });
              }
              res.view('Vistas/Grupo/ListarGrupo', {
                grupos: gruposEncontrados
              });
            })
        })
    } else {
      return res.view('Vistas/Error', {
        error: {
          desripcion: "Necesitamos que envies el ID, nombre y numero maximo de estudiantes",
          rawError: "No envia Parametros",
          url: "/ListarGrupos"
        }
      });
    }
  }
};

