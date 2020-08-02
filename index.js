import crearServidor from './src/config/server.js'
import config from './src/config/config.js'
import express from 'express'
import path from 'path'


const app = crearServidor()
// app.use(express.static('public/cliente/dist'))
app.use(express.static(path.join(__dirname, 'public/cliente/dist')))
app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en http://${config.HOST}:${config.PORT}`)
})