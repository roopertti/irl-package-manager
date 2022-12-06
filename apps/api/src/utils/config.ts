export const getPort = () => process.env.PORT || 3000

export const getEnv = () => process.env.NODE_ENV

export const getDbHost = () => process.env.DB_HOST || 'localhost'

export const getDbUser = () => process.env.DB_USER || 'irl-package-manager'

export const getDbPassword = () => process.env.DB_PASSWORD || 'dev'

export const getDbName = () => process.env.DB_NAME || 'irl-package-manager'

export const getDbPort = () => Number(process.env.DB_PORT) || 5432
