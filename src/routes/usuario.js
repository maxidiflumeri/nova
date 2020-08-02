import routerx from 'express-promise-router'
import usuarioController from '../controllers/usuarioController.js'
import auth from '../middlewares/auth.js'

const router = routerx()

router.get('/consultar', auth.verificarUsuario, usuarioController.consultar)
router.post('/agregar', usuarioController.agregar)
router.post('/login', usuarioController.login)
router.put('/modificar/:id', auth.verificarUsuario, usuarioController.modificar)
router.delete('/eliminar/:id', auth.verificarAdministrador, usuarioController.eliminar)

export default router