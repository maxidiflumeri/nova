import express from 'express'
import router from '../routes/index.js'
import cors from 'cors'
import morgan from 'morgan'
// import connect from 'connect-history-api-fallback'

const main = () =>{
    const app = express()

    // app.use(connect())
    app.use(express.json())
    app.use(cors())
    app.use(morgan('dev'))
    app.use('/api', router)

    return app

}

export default main