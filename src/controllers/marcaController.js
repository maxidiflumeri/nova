import models from '../models/index.js'
import _ from 'underscore'
import msj from '../messages/mensajes.js'

export default {
    consultar: async (req, res, next) => {
        try{
            if (_.isEmpty(req.query)) {
                const lista = await models.marca.obtenerTodos()
                if (lista.length > 0){
                    res.send(lista)
                }else{
                    res.send(msj.mensajeSinResultados())
                }          
            } else if (req.query.id) {
                const marca = await models.marca.obtenerPorId(req.query.id)
                    if (marca.length > 0){
                        res.send(marca)
                    }else{
                        res.send(msj.mensajeSinResultados())
                    }            
            } else if (req.query.descripcion) {
                const marca = await models.marca.obtenerPorDescripcion(req.query.descripcion)
                    if (marca.length > 0){
                        res.send(marca)
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
            const marca = await models.marca.agregar(req.body)
            res.send(marca)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    },

    eliminar: async (req, res, next) => {
        try{
            const marca = await models.marca.eliminar(req.params.id)
            res.send(marca)        
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    },

    modificar: async (req, res, next) => {
        try{
            const marca = await models.marca.modificar(req.params.id, req.body)
            res.send(marca)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    }
}