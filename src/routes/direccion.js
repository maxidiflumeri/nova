import routerx from 'express-promise-router'
import direccionController from '../controllers/direccionController.js'
import auth from '../middlewares/auth.js'

const router = routerx()

router.get('/consultar', auth.verificarUsuario, direccionController.consultar)
router.post('/agregar', auth.verificarUsuario, direccionController.agregar)
router.put('/modificar/:idUsuario/:idDireccion', auth.verificarUsuario, direccionController.modificar)
router.delete('/eliminar/:idUsuario/:idDireccion', auth.verificarUsuario, direccionController.eliminar)

export default router
