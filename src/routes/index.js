import routerx from 'express-promise-router'
import estadoRouter from './estado.js'
import marcaRouter from './marca.js'
import pedidoRouter from './pedido.js'
import productoRouter from './producto.js'
import tiposRouter from './tipo.js'
import usuarioRouter from './usuario.js'
import direccionRouter from './direccion.js'
import telefonoRouter from './telefono.js'
// import loginRouter from './login.js'

const router = routerx()

router.use('/estados', estadoRouter)
router.use('/marcas', marcaRouter)
router.use('/pedidos', pedidoRouter)
router.use('/productos', productoRouter)
router.use('/tiposProducto', tiposRouter)
router.use('/usuarios', usuarioRouter)
router.use('/direcciones', direccionRouter)
router.use('/telefonos', telefonoRouter)
// router.use('/login', loginRouter)

export default router