import express from 'express'
import dotenv from 'dotenv'
import { getPort } from './utils/config'

const app = express()

dotenv.config()

const PORT = getPort()

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})
