import multer from 'multer'

const subida = multer({
    dest: '../../public/cliente/public/img/'
})

export default{
    subida
}