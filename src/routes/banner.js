import routerx from 'express-promise-router'
import bannerController from '../controllers/bannerController.js'
import auth from '../middlewares/auth.js'

const router = routerx()

router.get('/consultar', bannerController.consultar)
router.post('/agregar', auth.verificarAdministrador, bannerController.agregar)
router.put('/modificar/:id', auth.verificarAdministrador, bannerController.modificar)
router.delete('/eliminar/:id', auth.verificarAdministrador, bannerController.eliminar)

export default router