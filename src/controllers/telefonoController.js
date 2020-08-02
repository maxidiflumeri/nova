//TOMAS MELENDEZ
import models from '../models/index.js'
import _ from 'underscore'
import msj from '../messages/mensajes.js'

export default {
    consultar: async (req, res, next) => {
        let resultado = null
        try{
            if(_.isEmpty(req.query)){                   
                const lista = await models.telefono.obtenerTodos()
                resultado = lista
                res.send(resultado)                      
            }                
            else if(req.query.idUsuario){                
                const lista = await models.telefono.obtenerTelefonosPorUsuario(req.query.idUsuario)
                resultado = lista
                if(resultado.length == 0){
                    resultado = msj.mensajeSinResultados()
                }
                res.send(resultado)        
            }
            else{
                resultado = msj.errorParams()
                res.send(resultado)  
            }       
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    },

    agregar: async (req, res, next) => {
        try{
            const telefono = models.telefono.agregarTelefono(req.body)
            res.send(telefono)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    },

    eliminar: async (req, res, next) => {
        try{
            const telefono = models.telefono.eliminarTelefono(req.params.idUsuario, req.params.telefono)
            res.send(telefono)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }    
    },

    modificar: async (req, res, next) => {
        try{
            const telefono = models.telefono.modificarTelefono(req.params.idUsuario, req.params.idTelefono, req.body)
            res.send(telefono)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }     
    }

}

