//TOMAS MALENDEZ
import models from '../models/index.js'
import _ from 'underscore'
import msj from '../messages/mensajes.js'   

export default{    
    consultar: async (req, res, next) => {
        let resultado = null
        try{
            if(_.isEmpty(req.query)){                     
                const lista = await models.direccion.obtenerTodos()
                resultado = lista
                res.send(resultado)  
            }else if(req.query.idUsuario){                
               const lista = await models.direccion.obtenerDireccionesPorUsuario(req.query.idUsuario)
                resultado = lista                
                if(resultado.length == 0){
                    resultado = msj.mensajeSinResultados()                
                    res.send(resultado)              
                }else{
                    res.send(resultado)
                }
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
            const direccion = await models.direccion.agregarDireccion(req.body)
            res.send(direccion)  
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error);            
        }
    },

    eliminar: async (req, res, next) => {
        try{
            const direccion = await models.direccion.eliminarDireccion(req.params.idUsuario, req.params.idDireccion)
            res.send(direccion)  
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error);            
        }        
    },

    modificar: async (req, res, next) => {
        try{            
            const direccion = models.direccion.modificarDireccion(req.params.idUsuario, req.params.idDireccion, req.body)
            res.send(direccion)          
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error);     
        }
    }
}

