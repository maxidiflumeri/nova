import routerx from 'express-promise-router'
import pedidoController from '../controllers/pedidoController.js'
import auth from '../middlewares/auth.js'

const router = routerx()

router.get('/consultar', auth.verificarUsuario, pedidoController.consultar)
router.post('/agregar', auth.verificarUsuario, pedidoController.agregar)
router.put('/modificar/:id', auth.verificarAdministrador, pedidoController.modificar)
router.delete('/eliminar/:id', auth.verificarAdministrador, pedidoController.eliminar)

export default router