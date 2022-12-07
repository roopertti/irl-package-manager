import { DBInstance } from '../utils/db'
import { LoggerInstance } from '../utils/logger'
import { Maybe, none, someOf } from '../utils/validation/maybe'

const TABLE_NAME = 'user'

export type UserTable = {
  id: number
  uuid: string
  externalId: string
  name: string
  email: string
  authProvider: 'google'
  createdAt: Date
  lastLoginAt: Date
}

type QueryDependencies = {
  db: DBInstance
  logger: LoggerInstance
}

type CreateUserInput = {
  uuid: string
  externalId: string
  name: string
  email: string
  authProvider: 'google'
}

type UpdateUserInput = {
  name: string
  email: string
}

export const findUserByExternalId = async ({
  externalId,
  deps: { db },
}: {
  externalId: string
  deps: QueryDependencies
}): Promise<Maybe<UserTable>> => {
  const res = await db
    .select('*')
    .from<UserTable>(TABLE_NAME)
    .where('externalId', externalId)

  return res[0] ? someOf(res[0]) : none()
}

export const createUser = async ({
  input,
  deps: { db, logger },
}: {
  input: CreateUserInput
  deps: QueryDependencies
}): Promise<UserTable> => {
  const res = await db<UserTable>(TABLE_NAME).insert(input).returning('*')
  const user = res[0]
  logger.info(
    `New user inserted with id ${user.id} with provider: ${user.authProvider} and externalId: ${user.externalId}`,
  )
  return user
}

export const updateUser = async ({
  id,
  input,
  deps: { db, logger },
}: {
  id: number
  input: UpdateUserInput
  deps: QueryDependencies
}): Promise<UserTable> => {
  const res = await db<UserTable>(TABLE_NAME)
    .update(input)
    .where('id', id)
    .returning('*')
  const user = res[0]
  logger.info(
    `User updated with id ${user.id} and provider: ${user.authProvider} and externalId: ${user.externalId}`,
  )
  return user
}

export const deleteUser = async ({
  id,
  deps: { db, logger },
}: {
  id: number
  deps: QueryDependencies
}): Promise<void> => {
  await db<UserTable>(TABLE_NAME).where('id', id).del()
  logger.info(`User deleted with id ${id}`)
}

export const updateUserLastLogin = async ({
  id,
  deps: { db, logger },
}: {
  id: number
  deps: QueryDependencies
}): Promise<void> => {
  await db<UserTable>(TABLE_NAME)
    .update({ lastLoginAt: db.fn.now() })
    .where('id', id)
}
