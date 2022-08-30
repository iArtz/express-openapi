import express from 'express'
import { initialize } from 'express-openapi'
import { serve, setup } from 'swagger-ui-express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import apiDoc from './api/api-doc.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('./public'))

initialize({
  app,
  apiDoc: apiDoc,
  paths: './api/paths',
})

app.use(
  '/api-documentation',
  serve,
  setup(null, {
    swaggerOptions: {
      url: 'http://localhost:3000/api-docs',
    },
  })
)

app.listen(3000)

export default app
