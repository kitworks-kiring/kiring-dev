import { prisma } from '@/lib/prisma'
import { KakaoOAuthId, UserAuthRequest } from '@/types/user'

// 카카오 ID로 가입 여부 확인
export const findUserByKakao = ({ kakaoId }: KakaoOAuthId) => {
  return prisma.user.findUnique({
    where: { kakao_id: kakaoId },
    select: { user_id: true, kakao_id: true },
  })
}

// 카카오 ID로 가입 여부 업데이트
export const saveUserByKakao = ({ userId, kakaoId }: UserAuthRequest) => {
  return prisma.user.update({
    where: { user_id: userId },
    data: { kakao_id: kakaoId },
  })
}

// 로그인 사용자 정보 조회
export const findUserByAuth = ({ userId }: UserAuthRequest) => {
  return prisma.user.findUnique({
    where: { user_id: userId },
    select: {
      user_id: true,
      kakao_id: true,
      name: true,
      team_code: true,
      profile_url: true,
      is_employed: true,
      is_admin: true,
    },
  })
}
