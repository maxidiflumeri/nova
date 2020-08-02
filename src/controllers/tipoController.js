import models from '../models/index.js'
import _ from 'underscore'
import msj from '../messages/mensajes.js'

export default {
    consultar: async (req, res, next) => {
        try{
            if (_.isEmpty(req.query)) {
                const lista = await models.tipo.obtenerTodos()
                if (lista.length > 0){
                    res.send(lista)
                }else{
                    res.send(msj.mensajeSinResultados())
                }          
            } else if (req.query.id) {
                const tipo = models.tipo.obtenerPorId(req.query.id)
                    if (tipo.length > 0){
                        res.send(tipo)
                    }else{
                        res.send(msj.mensajeSinResultados())
                    }            
            } else if (req.query.descripcion) {
                const tipo = models.tipo.obtenerPorDescripcion(req.query.descripcion)
                    if (tipo.length > 0){
                        res.send(tipo)
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
            const tipo = await models.tipo.agregar(req.body)
            res.send(tipo)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    },

    eliminar: async (req, res, next) => {
        try{
            const tipo = models.tipo.eliminar(req.params.id)
            res.send(tipo)        
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    },

    modificar: async (req, res, next) => {
        try{
            const tipo = await models.tipo.modificar(req.params.id, req.body)
            res.send(tipo)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    }
}