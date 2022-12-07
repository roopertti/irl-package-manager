import { Request, Response, NextFunction } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { getGoogleClientId } from '../utils/config'
import { LoggerInstance } from '../utils/logger'

type Dependencies = {
  logger: LoggerInstance
}

/**
 * Verifies request id token and populates request object with external id
 */
export const isAuthorized =
  ({ logger }: Dependencies) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const googleClientId = getGoogleClientId()
      const client = new OAuth2Client(googleClientId)
      const idToken = req.headers.authorization?.split(' ')[1]

      if (!idToken) {
        logger.info(
          `Unauthorised access, no ID token found for while accessing ${
            req.url
          } with params ${JSON.stringify(req.params)}`,
        )
        res.sendStatus(401)
        return
      }

      const ticket = await client.verifyIdToken({
        idToken,
        audience: googleClientId,
      })

      const payload = ticket.getPayload()
      req.externalId = payload?.sub ?? null
      req.user = {
        name: payload?.name ?? '-',
        email: payload?.email ?? '-',
        provider: 'google',
      }
      next()
    } catch (e) {
      res.sendStatus(403)
    }
  }
