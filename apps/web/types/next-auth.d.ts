// eslint-disable-next-line no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
  export interface Session {
    idToken: string
  }
}
