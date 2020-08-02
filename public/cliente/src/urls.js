const urlEstados = '/api/estados'
const urlMarcas = '/api/marcas'
const urlTipos = '/api/tiposProducto'
const urlPedidos = '/api/pedidos'
const urlUsuarios = '/api/usuarios'
const urlProductos = '/api/productos'
const urlDirecciones = '/api/direcciones'
const urlTelefonos = '/api/telefonos'
const urlLogin = '/api/usuarios/login'
const url = process.env.NODE_ENV === 'production'? '': 'http://localhost:5000'

export default{
    urlEstados,
    urlMarcas,
    urlTipos,
    urlPedidos,
    urlUsuarios,
    urlProductos,
    urlDirecciones,
    urlTelefonos,
    urlLogin,
    url
}
