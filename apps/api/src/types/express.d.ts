declare global {
  export namespace Express {
    export interface Request {
      externalId: string | null
      user: {
        name: string | null
        email: string | null
        provider: 'google'
      }
    }
  }
}

export {}
