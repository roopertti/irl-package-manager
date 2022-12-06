import express from 'express'
import dotenv from 'dotenv'
import { getPort } from './utils/config'
import { getLogger } from './utils/logger'
import { getDbConnection } from './utils/db'

const app = express()

dotenv.config()

const PORT = getPort()

const db = getDbConnection()
const logger = getLogger()

app.listen(PORT, () => {
  logger.info(`Listening to ${PORT}`)
})
