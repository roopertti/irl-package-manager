declare global {
  export namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'test'
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
    }
  }
}
