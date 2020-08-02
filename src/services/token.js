import jwt from 'jsonwebtoken'
import models from '../models/index.js'

async function chequearToken(token){
    let idToken = null
    try{
        const objeto = await jwt.decodificar(token)
        idToken = objeto.usuario.ID_USUARIO
    }catch(error){
        return false
    }
    const usuarioLista = await models.usuario.obtenerUsuarioPorId(idToken)
    if(usuarioLista.length > 0){
        const usuario = usuarioLista[0]
        const token = jwt.sign({usuario}, 'claveSecretaToken', {expiresIn: '1d'})
        return {token, usuario}
    }else{
        return false
    }
}

export default {
    codificar: async (usuario) => {
        const token = jwt.sign({usuario}, 'claveSecretaToken', {expiresIn: '1d'})
        return token
    },

    decodificar: async (token) => {        
        try{
            const objeto = jwt.verify(token, 'claveSecretaToken')                 
            const usuario = await models.usuario.obtenerUsuarioPorId(objeto.usuario.ID_USUARIO)
            if(usuario.length > 0){
                return usuario[0]
            }else{
                return false
            }
        }catch(error){
            const newToken = await chequearToken(token)
            return newToken
        }
    }

}
