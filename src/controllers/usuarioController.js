import models from '../models/index.js'
import _ from 'underscore'
import msj from '../messages/mensajes.js'   
import token from '../services/token.js'

export default {
    consultar: async (req, res, next) => {
        try{            
            if(_.isEmpty(req.query)){                 
                const lista = await models.usuario.obtenerTodos()                
                res.send(lista)   
            }
            else if(req.query.correo && req.query.clave){                
                const lista = await models.usuario.obtenerUsuarioPorMailClave(req.query.correo, req.query.clave)       
                if(lista.length == 0){
                    res.send(msj.mensajeSinResultados())
                }else{
                    res.send(lista)
                }                               
            }
            else if(req.query.idUsuario){                    
                const lista = await models.usuario.obtenerUsuarioPorId(req.query.idUsuario)                
                if(lista.length == 0){
                    res.send(msj.mensajeSinResultados())
                }else{
                    res.send(lista)
                }                
            }
            else{ 
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
            const usuario = await models.usuario.agregarUsuario(req.body)
            res.send(usuario) 
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)           
        }
    },

    modificar: async(req, res, next) => {
        try{
            const usuario = await models.usuario.modificarUsuario(req.params.idUsuario, req.body)
            res.send(usuario)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)             
        }
    },

    eliminar: async(req, res, next) => {
        try{
            const usuario = await models.usuario.eliminarUsuario(req.params.id_usuario)
            res.send(usuario)
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)   
        }
    },

    login: async(req, res, next) => {
        try{
            console.log(req.body.usuario + " " + req.body.password)
            const usuario = await models.usuario.obtenerUsuarioPorMailClave(req.body.usuario, req.body.password)
            console.log(usuario)
            if(usuario.length > 0){
                let tokenReturn = await token.codificar(usuario[0])
                res.send({
                    usuario: usuario[0],
                    tokenReturn  
                })
            }else{
                res.send(msj.mensajeFallaLogin())
            }

        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)     
        }
    }
}