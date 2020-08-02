import models from '../models/index.js'
import _ from 'underscore'
import msj from '../messages/mensajes.js'   

export default {
    consultar: async (req, res, next) => {
        try{
            if (_.isEmpty(req.query)) {
                const lista = await models.producto.obtenerTodos()                    
                res.send(lista)                
            }
            // GET ProductoPorIdProducto
            else if (req.query.id_producto) {
                const lista = await models.producto.obtenerProductoPorId(req.query.id_producto)                    
                if (lista.length > 0) {
                    res.send(lista)
                }
                else {
                    res.send(msj.mensajeSinResultados())
                }
            }
            // GET ProductoPorIdMarca
            else if (req.query.id_marca) {
                const lista = await models.producto.obtenerProductoPorIdMarca(req.query.id_marca)                    
                if (lista.length > 0) {
                    res.send(lista)
                }
                else {
                    res.send(msj.mensajeSinResultados())
                }              
            }
            // GET ProductoPorIdTipo
            else if (req.query.id_tipo) {
                const lista = await models.producto.obtenerProductoPorIdTipo(req.query.id_tipo)                    
                if (lista.length > 0) {
                    res.send(lista)
                }
                else {
                    res.send(msj.mensajeSinResultados())
                }                
            }
            // GET ProductoPorModelo
            else if (req.query.modelo) {
                const lista = await models.producto.obtenerProductoPorModelo(req.query.modelo)           
                if (lista.length > 0) {
                    res.send(lista)
                }
                else {
                    res.send(msj.mensajeSinResultados())
                }        
            }
            // GET ProductoPorDescripcion
            else if (req.query.descripcion) {
                const lista = await models.producto.obtenerProductoPorDescripcion(req.query.descripcion) 
                if (lista.length > 0) {
                    res.send(lista)
                }
                else {
                    res.send(msj.mensajeSinResultados())
                }               
            }
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
            const producto = await models.producto.agregarProducto(req.body)
            res.send(producto)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)  
        }
    },

    modificar: async (req, res, next) => {
        console.log(req.params)
        try{
            const producto = await models.producto.modificarProducto(req.params.id, req.body)
            res.send(producto)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error) 
        }
    },

    eliminar: async (req, res, next) => {
        try{
            const producto = await models.producto.eliminarProductoById(req.params.id)                
            res.send(producto)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)  
        }
    }
}