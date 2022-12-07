import { Request, Response, Router } from 'express'
import { isAuthorized } from '../../middleware/isAuthorized'
import { registerUser } from '../../services/user/registerUser'
import { DBInstance } from '../../utils/db'
import { LoggerInstance } from '../../utils/logger'

type Dependencies = {
  logger: LoggerInstance
  db: DBInstance
}

export const getUserRoutes = ({ logger, db }: Dependencies) => {
  const router = Router()

  router.get('/me', isAuthorized({ logger }), (req: Request, res: Response) =>
    registerUser(req, res, { logger, db }),
  )

  return router
}
