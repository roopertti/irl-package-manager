import type { Knex } from 'knex'

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgres',
    connection: {
      database: 'irl-package-manager',
      user: 'irl-package-manager',
      password: 'dev',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}

module.exports = config
