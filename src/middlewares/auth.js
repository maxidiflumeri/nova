import tokenService from '../services/token.js'

export default {
    verificarUsuario: async (req, res, next) => {
        if(!req.headers.token){
            return res.status(404).send({
                mensaje: 'No Existe el token.'
            })
        }
        const response = await tokenService.decodificar(req.headers.token)
        if(response.ADMINISTRADOR == 'S' || response.ADMINISTRADOR == 'N'){
            next()
        }else{
            res.status(403).send({
                mensaje: 'Usuario no autorizado.'
            })
        }
    },
    
    verificarAdministrador: async (req, res, next) =>{
        if(!req.headers.token){
            return res.status(404).send({
                mensaje: 'No Existe el token.'
            })
        }
        const response = await tokenService.decodificar(req.headers.token)
        console.log(response)
        if(response.ADMINISTRADOR == 'S'){
            next()
        }else{
            res.status(403).send({
                mensaje: 'Usuario no autorizado.'
            })
        }    
    }

}