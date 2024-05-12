import cookieParser from 'cookie-parser'
import cors, { CorsOptions } from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './env'
import { mongoConnection } from './libs/mongoose'
import { errorMiddleware } from './middleware/error.middleware'
import { router } from './routes/routes'

const options: CorsOptions = {
  origin: env.CORS_ORIGIN,
  credentials: true
}

export const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(helmet())

app.use(cors(options))

app.use('/api', router)

app.use(errorMiddleware)

mongoConnection()

app.listen(env.PORT, function () {
  console.log(`✅ Server is Running on ${env.PORT.toString()}.`)
})
