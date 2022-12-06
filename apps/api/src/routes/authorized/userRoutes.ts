import { Router } from 'express'
import { isAuthorized } from '../../middleware/isAuthorized'

export const getUserRoutes = () => {
  const router = Router()

  router.get('/me', isAuthorized, (req, res) => {
    res.send('user:' + req.externalId)
  })

  return router
}
