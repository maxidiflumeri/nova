import routerx from 'express-promise-router'
import productoController from '../controllers/productoController.js'
import auth from '../middlewares/auth.js'

const router = routerx()

router.get('/consultar', productoController.consultar)
router.post('/agregar', auth.verificarAdministrador, productoController.agregar)
router.put('/modificar/:id', auth.verificarAdministrador, productoController.modificar)
router.delete('/eliminar/:id', auth.verificarAdministrador, productoController.eliminar)

export default router