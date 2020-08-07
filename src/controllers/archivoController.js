import models from '../models/index.js'
import _ from 'underscore'

export default {
    agregar: async (req, res, next) => {
        try{
            console.log(req)
            res.send({archivo: req.archivo})
        }catch(error){
            res.status(500).send({
                mensaje: 'Ocurrio un error.'
            })
            next(error)
        }
    }
}