import { Request, Response } from 'express'
import {
  createUser,
  findUserByExternalId,
  updateUserLastLogin,
} from '../../queries/userQueries'
import { DBInstance } from '../../utils/db'
import { LoggerInstance } from '../../utils/logger'
import { isSome, unwrap } from '../../utils/validation/maybe'
import { v4 as uuidv4 } from 'uuid'
import { toUserResponse } from './toUserResponse'

type Dependencies = {
  db: DBInstance
  logger: LoggerInstance
}

export const registerUser = async (
  req: Request,
  res: Response,
  deps: Dependencies,
) => {
  const {
    externalId,
    user: { name, email, provider },
  } = req
  const { logger } = deps

  if (!externalId || !name || !email) {
    logger.info(`Failed to register user, no externalId was provided`)
    res.sendStatus(403)
    return
  }

  const maybeUser = await findUserByExternalId({ externalId, deps })

  if (isSome(maybeUser)) {
    const user = unwrap(maybeUser)
    await updateUserLastLogin({ id: user.id, deps })
    res.send(toUserResponse(user))
    return
  }

  logger.info(
    `Creating new user with email ${email} and externalId ${externalId}`,
  )

  const user = await createUser({
    input: {
      uuid: uuidv4(),
      name,
      email,
      externalId,
      authProvider: provider,
    },
    deps,
  })

  res.send(toUserResponse(user))
}
