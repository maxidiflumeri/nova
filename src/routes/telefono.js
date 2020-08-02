import routerx from 'express-promise-router'
import telefonoController from '../controllers/telefonoController.js'
import auth from '../middlewares/auth.js'

const router = routerx()

router.get('/consultar', auth.verificarUsuario, telefonoController.consultar)
router.post('/agregar', auth.verificarUsuario, telefonoController.agregar)
router.put('/modificar/:idUsuario/:idTelefono', auth.verificarUsuario, telefonoController.modificar)
router.delete('/eliminar/:idUsuario/:telefono', auth.verificarUsuario, telefonoController.eliminar)

export default router