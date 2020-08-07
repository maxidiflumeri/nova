import models from '../models/index.js'
import _ from 'underscore'
import msj from '../messages/mensajes.js'

export default {
    consultar: async (req, res, next) => {
        try{
            if (_.isEmpty(req.query)) {
                const lista = await models.banner.obtenerTodos()
                if (lista.length > 0){
                    res.send(lista)
                }else{
                    res.send(msj.mensajeSinResultados())
                }          
            } else if (req.query.id) {
                const banner = await models.banner.obtenerPorId(req.query.id)
                    if (banner.length > 0){
                        res.send(banner)
                    }else{
                        res.send(msj.mensajeSinResultados())
                    }            
            } else if (req.query.img) {
                const banner = await models.banner.obtenerPorImg(req.query.img)
                    if (banner.length > 0){
                        res.send(banner)
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
            const banner = await models.banner.agregar(req.body)
            res.send(banner)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    },

    eliminar: async (req, res, next) => {
        try{
            const banner = await models.banner.eliminar(req.params.id)
            res.send(banner)        
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    },

    modificar: async (req, res, next) => {
        try{
            const banner = await models.banner.modificar(req.params.id, req.body)
            res.send(banner)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    }
}