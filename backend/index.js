import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import FootprintController from './footprint.controller.js'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/emissions', FootprintController)

app.listen(8000, () => {
  console.log('app is listening on port 8000')
})
