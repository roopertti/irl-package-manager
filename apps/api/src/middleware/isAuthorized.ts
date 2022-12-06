import { Request, Response, NextFunction } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { getGoogleClientId } from '../utils/config'

/**
 * Verifies request id token and populates request object with external id
 */
export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const googleClientId = getGoogleClientId()
    const client = new OAuth2Client(googleClientId)
    const idToken = req.headers.authorization?.split(' ')[1]

    if (!idToken) {
      res.sendStatus(403)
      return
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: googleClientId,
    })

    const payload = ticket.getPayload()
    req.externalId = payload?.sub ?? null
    next()
  } catch (e) {
    res.sendStatus(403)
  }
}
