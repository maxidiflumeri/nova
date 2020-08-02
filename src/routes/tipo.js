import routerx from 'express-promise-router'
import tipoController from '../controllers/tipoController.js'
import auth from '../middlewares/auth.js'

const router = routerx()

router.get('/consultar', tipoController.consultar)
router.post('/agregar', auth.verificarAdministrador, tipoController.agregar)
router.put('/modificar/:id', auth.verificarAdministrador, tipoController.modificar)
router.delete('/eliminar/:id', auth.verificarAdministrador, tipoController.eliminar)

export default router