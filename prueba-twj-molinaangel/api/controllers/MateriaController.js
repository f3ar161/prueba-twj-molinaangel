/**
 * MateriaController
 *
 * @description :: Server-side logic for managing Materias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearMateria: function (req, res) {

    if (req.method == "POST") {

      var parametros = req.allParams();

      if (parametros.nombreMateria && parametros.topicoMateria && parametros.fechaCreacion) {
        var materiaCrear = {
          nombreMateria: parametros.nombreMateria,
          topicoMateria: parametros.topicoMateria,
          fechaCreacion: parametros.fechaCreacion
        }
        if (materiaCrear.fechaCreacion == "") {
          delete materiaCrear.fechaCreacion
        }
        Materia.create(materiaCrear).exec(function (err, materiaCreado) {
          if (err) {
            return res.view('Vistas/Error', {
              error: {
                desripcion: "Fallo al crear materia",
                rawError: err,
                url: "/CrearMateria"
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
                    url: "/ListarMateria"
                  }
                });
              }
              res.view('Vistas/Materia/ListarMateria', {
                materias: materiasEncontrados
              });
            })
        })
      } else {
        return res.view('Vistas/Error', {
          error: {
            desripcion: "Llena todos los parametros",
            rawError: "Fallo en envio de parametros",
            url: "/CrearMateria"
          }
        });
      }
    } else {
      return res.view('Vistas/Error', {
        error: {
          desripcion: "Error en el uso del Metodo HTTP",
          rawError: "HTTP Invalido",
          url: "/CrearMateria"
        }
      });
    }
  },
  BorrarMateria: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Materia.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, MateriaRemovido) {
        if (errorInesperado) {
          return res.view('Vistas/Error', {
            error: {
              desripcion: "Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarMateria"
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
                  url: "/ListarMateria"
                }
              });
            }
            res.view('Vistas/Materia/ListarMateria', {
              materias: materiasEncontrados
            });
          })
      })

    } else {
      return res.view('Vistas/Error', {
        error: {
          desripcion: "Necesitamos el ID para borrar la materia",
          rawError: "No envia ID",
          url: "/ListarMateria"
        }
      });
    }
  },
  editarMateria: function (req, res) {
    var parametros = req.allParams();
    if (parametros.idMateria && (parametros.nombreMateria || parametros.topicoMateria || parametros.fechaCreacion)) {
      var materiaAEditar = {
        nombreMateria: parametros.nombreMateria,
        topicoMateria: parametros.topicoMateria,
        fechaCreacion: parametros.fechaCreacion
      }
      if (materiaAEditar.nombreMateria == "") {
        delete materiaAEditar.nombreMateria
      }
      if (materiaAEditar.topicoMateria == "") {
        delete materiaAEditar.topicoMateria
      }
      if (materiaAEditar.fechaCreacion == "") {
        delete materiaAEditar.fechaCreacion
      }
      Materia.update({
        id: parametros.idMateria
      }, materiaAEditar)
        .exec(function (errorInesperado, MateriaRemovido) {
          if (errorInesperado) {
            return res.view('Vistas/Error', {
              error: {
                desripcion: "Error Inesperado",
                rawError: errorInesperado,
                url: "/ListarMateria"
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
                    url: "/ListarMateria"
                  }
                });
              }
              res.view('Vistas/Materia/ListarMateria', {
                materias: materiasEncontrados
              });
            })
        })
    } else {
      return res.view('Vistas/Error', {
        error: {
          desripcion: "Necesitamos que envies el ID, nombre, topico, fecha",
          rawError: "No envia Parametros",
          url: "/ListarMateria"
        }
      });
    }
  }
};

