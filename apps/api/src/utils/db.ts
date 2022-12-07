import knex, { Knex } from 'knex'
import {
  getDbHost,
  getDbName,
  getDbPassword,
  getDbPort,
  getDbUser,
} from './config'

export type DBInstance = Knex

export const getDbConnection = (): DBInstance => {
  return knex({
    client: 'pg',
    connection: {
      host: getDbHost(),
      port: getDbPort(),
      user: getDbUser(),
      password: getDbPassword(),
      database: getDbName(),
    },
  })
}
