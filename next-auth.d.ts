import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      userId: string
      teamCode: string
      profileUrl: string
      isEmployed: boolean
      isAdmin: boolean
    }
    accessToken: string
  }
}
