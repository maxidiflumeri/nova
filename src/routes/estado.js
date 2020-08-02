import routerx from 'express-promise-router'
import estadoController from '../controllers/estadoController.js'
import auth from '../middlewares/auth.js'

const router = routerx()

router.get('/consultar', estadoController.consultar)
router.post('/agregar', auth.verificarAdministrador, estadoController.agregar)
router.put('/modificar/:id', auth.verificarAdministrador, estadoController.modificar)
router.delete('/eliminar/:id', auth.verificarAdministrador, estadoController.eliminar)

export default router