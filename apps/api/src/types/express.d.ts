declare global {
  export namespace Express {
    export interface Request {
      externalId: string | null
    }
  }
}

export {}
