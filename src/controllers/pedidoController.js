import models from '../models/index.js'
import _ from 'underscore'
import msj from '../messages/mensajes.js'   

export default {
    consultar: async (req, res, next) => {
        try{
            let resultado = null       
            if(_.isEmpty(req.query)){  
                const lista = await models.pedido.obtenerTodos()
                resultado = lista
                res.send(resultado)                  
            } else if(req.query.idDetalle){
                const lista = await models.pedido.obtenerDetalles(req.query.idDetalle)
                resultado = lista
                if(resultado.length > 0){
                    res.send(resultado)
                }else{
                    res.send(msj.mensajeSinResultados())
                }                
            } else if(req.query.idPedido){
                const lista = await models.pedido.obtenerPedidoPorId(req.query.idPedido)
                resultado = lista
                if(resultado.length > 0)
                    res.send(resultado)
                else{
                    res.send(msj.mensajeSinResultados())
                }          
            } else if(req.query.idUsuario){
                const lista = await models.pedido.obtenerPedidosPorUsuario(req.query.idUsuario)
                resultado = lista
                if(resultado.length > 0){
                    res.send(resultado)
                }else{
                    res.send(msj.mensajeSinResultados())
                }   
            } else{
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
            const pedido = await models.pedido.agregarPedido(req.body)                      
            res.send(msj.mensajePost())   
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error) 
        }
    },

    modificar: async (req, res, next) => {
        try{
            const pedido = await models.pedido.modificarPedido(req.params.id, req.body)
            res.send(pedido)  
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error) 
        }
    },

    eliminar: async (req, res, next) => {
        try{
            const pedido = await models.pedido.eliminarPedido(req.params.id)
            res.send(pedido)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)  
        }
    }
}