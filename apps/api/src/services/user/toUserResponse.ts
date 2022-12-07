import { UserTable } from '../../queries/userQueries'

type UserResponse = Omit<
  UserTable,
  'id' | 'externalId' | 'authProvider' | 'createdAt'
>

export const toUserResponse = (user: UserTable): UserResponse => {
  const { uuid, name, email, lastLoginAt } = user

  return {
    uuid,
    name,
    email,
    lastLoginAt,
  }
}
