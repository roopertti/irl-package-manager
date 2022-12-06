declare global {
  export namespace NodeJS {
    export interface ProcessEnv {
      PORT: number
      NODE_ENV: 'production' | 'development' | 'test'
      DB_HOST: string
      DB_USER: string
      DB_PASSWORD: string
      DB_NAME: string
      DB_PORT: number
    }
  }
}
