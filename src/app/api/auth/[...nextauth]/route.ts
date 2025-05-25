import NextAuth, { NextAuthOptions } from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao'
import { isRegisteredByKakao, updateUserByKakao, getUserByAuth } from '@/services/userService'
import { errorMessages } from '@/constants/errorMessages'

export const authOptions: NextAuthOptions = {
  // 인증 방식 정의 (ex. Kakao, Google, ...)
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],

  // 인증 플로우 중 호출되는 hook 설정 (비동기로 호출되지만 signIn > jwt > session 순서 보장됨)
  callbacks: {
    // 1. 로그인 시도 시 호출되는 함수로, 사용자 인증 로직 구현
    async signIn({ account, profile, user }) {
      if (account?.provider !== 'kakao') {
        return `/error?code=${errorMessages.INVALID_REQUEST}`
      }

      const kakaoProfile = profile as { id: string }
      const kakaoId = `${kakaoProfile?.id ?? ''}`
      if (!kakaoId) {
        return `error?code=${errorMessages.MISSING_REQUIRED_DATA}`
      }

      // 1) 카카오 데이터로 가입 여부 확인 (true면 로그인, false면 가입)
      const [registrationRes, registrationErr] = await isRegisteredByKakao({ kakaoId })
      if (registrationErr) {
        return `/error?code=${errorMessages.INTERNAL_SERVER_ERROR}`
      }

      const { userId, isAlreadySignedUp } = registrationRes || {}
      if (!userId) {
        return `/error?code=${errorMessages.NOT_KITREWORKS_MEMBER}`
      }

      // 2) 가입되어있지 않을 경우 회원가입 처리
      if (!isAlreadySignedUp) {
        const [signupRes, signupErr] = await updateUserByKakao({ userId, kakaoId })
        if (!signupRes?.isSuccess || signupErr) {
          return `/error?code=${errorMessages.INTERNAL_SERVER_ERROR}`
        }
      }

      // 3) 로그인 허용
      user.id = userId
      return true
    },

    // 2. JWT 토큰 발급/변경 시 호출되는 함수로, 토큰에 추가 정보 저장 가능
    async jwt({ token, user, account }) {
      if (user && account) {
        const [userInfo, userInfoErr] = await getUserByAuth({ userId: user?.id })
        if (userInfo && !userInfoErr) {
          token.userId = userInfo?.userId || ''
          token.name = userInfo?.name || ''
          token.teamCode = userInfo?.teamCode || ''
          token.profileUrl = userInfo?.profileUrl || ''
          token.isEmployed = userInfo?.isEmployed || false
          token.isAdmin = userInfo?.isAdmin || false
          token.accessToken = account?.access_token || ''
        }
      }
      return token
    },

    // 3. 클라이언트에 반환할 세션 객체를 정의하는 함수로, 세션에 사용자 정보 추가 가능
    session({ session, token }) {
      if (session?.user && token) {
        session.user.userId = token?.userId as string
        session.user.name = token?.name as string
        session.user.teamCode = token?.teamCode as string
        session.user.profileUrl = token?.profileUrl as string
        session.user.isEmployed = token?.isEmployed as boolean
        session.user.isAdmin = token?.isAdmin as boolean
        session.accessToken = token?.accessToken as string
      }
      return session
    },
  },

  // 세션 관리 방식 설정 (ex. JWT, Database)
  session: {
    maxAge: 30 * 24 * 60 * 60, // 세션 유효 기간 30일
    strategy: 'jwt',
  },

  // 토큰 암호화, 서명에 사용되는 비밀키
  secret: process.env.NEXTAUTH_SECRET,

  // 기본 제공되는 인증 페이지를 커스터마이징할 때 사용하는 옵션
  pages: {
    // signIn: '/signin',
    error: '/error',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
