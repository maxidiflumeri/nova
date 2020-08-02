import routerx from 'express-promise-router'
import marcaController from '../controllers/marcaController.js'
import auth from '../middlewares/auth.js'

const router = routerx()

router.get('/consultar', marcaController.consultar)
router.post('/agregar', auth.verificarAdministrador, marcaController.agregar)
router.put('/modificar/:id', auth.verificarAdministrador, marcaController.modificar)
router.delete('/eliminar/:id', auth.verificarAdministrador, marcaController.eliminar)

export default router