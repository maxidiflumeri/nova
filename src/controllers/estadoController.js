import models from '../models/index.js'
import _ from 'underscore'
import msj from '../messages/mensajes.js'

export default {
    consultar: async (req, res, next) => {
        try{
            if (_.isEmpty(req.query)) {
                const lista = await models.estado.obtenerTodos()
                if (lista.length > 0){
                    res.send(lista)
                }else{
                    res.send(msj.mensajeSinResultados())
                }          
            } else if (req.query.id) {
                const estado = models.estado.obtenerPorId(req.query.id)
                    if (estado.length > 0){
                        res.send(estado)
                    }else{
                        res.send(msj.mensajeSinResultados())
                    }            
            } else if (req.query.descripcion) {
                const estado = models.estado.obtenerPorDescripcion(req.query.descripcion)
                    if (estado.length > 0){
                        res.send(estado)
                    }else{
                        res.send(msj.mensajeSinResultados())
                    }        }
            else {
                res.send(msj.errorParams())
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
            const estado = await models.estado.agregar(req.body)
            res.send(estado)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    },

    eliminar: async (req, res, next) => {
        try{
            const estado = models.estado.eliminar(req.params.id)
            res.send(estado)        
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    },

    modificar: async (req, res, next) => {
        try{
            const estado = await models.estado.modificar(req.params.id, req.body)
            res.send(estado)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    }
}