import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/cliente/public/img'),
    filename: function (req, file, cb) {
        console.log(file.originalname)
        cb(null, file.originalname)
    }
})

const subida = multer({
    storage,
    dest: path.join(__dirname, '../../public/cliente/public/img')
})

export default {
    subida
}