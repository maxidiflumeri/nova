import routerx from 'express-promise-router'
import archivoController from '../controllers/archivoController.js'
import auth from '../middlewares/auth.js'
import multer from '../middlewares/multer.js'

const router = routerx()

router.post('/agregar', multer.subida.single('archivo'), archivoController.agregar)

export default router