import express from 'express'
import router from './router.js'
import cors from 'cors'


const main = () =>{
    const app = express()

    app.use(express.json())
    app.use(cors()) 
    app.use('/api/estados', router.estado)
    app.use('/api/marcas', router.marca)
    app.use('/api/pedidos', router.pedido)
    app.use('/api/productos', router.producto)
    app.use('/api/tiposProducto', router.tipoProducto)
    app.use('/api/usuarios', router.usuario)
    app.use('/api/direcciones', router.direccion)
    app.use('/api/telefonos', router.telefono)      
    app.use(express.static('public/cliente/dist'))

    return app

}

export default main