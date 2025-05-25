import { findUserByKakao, saveUserByKakao, findUserByAuth } from '@/db/userRepository'
import { wrapServiceResponse } from '@/utils/wrapServiceResponse'
import { KakaoOAuthId, UserAuthRequest } from '@/types/user'

// 카카오 ID로 가입 여부 확인
export function isRegisteredByKakao({ kakaoId }: KakaoOAuthId) {
  return wrapServiceResponse({
    fn: () =>
      findUserByKakao({ kakaoId }).then((result) => ({
        userId: result?.user_id,
        isAlreadySignedUp: !!(result?.user_id && result?.kakao_id === kakaoId),
      })),
    options: {
      failureMessage: '유저 가입 여부 조회 실패',
      onError: (e) => console.error('[userService]', e),
    },
  })
}

// 카카오 ID로 가입 여부 업데이트
export function updateUserByKakao({ userId, kakaoId }: UserAuthRequest) {
  return wrapServiceResponse({
    fn: () =>
      saveUserByKakao({ userId, kakaoId }).then((result) => ({
        isSuccess: !!(result?.user_id && result?.kakao_id),
      })),
    options: {
      failureMessage: '유저 가입 여부 업데이트 실패',
      onError: (e) => console.error('[userService]', e),
    },
  })
}

// 로그인 사용자 정보 조회
export function getUserByAuth({ userId }: UserAuthRequest) {
  return wrapServiceResponse({
    fn: () =>
      findUserByAuth({ userId }).then((result) => ({
        userId: result?.user_id,
        name: result?.name,
        teamCode: result?.team_code,
        profileUrl: result?.profile_url,
        isEmployed: result?.is_employed,
        isAdmin: result?.is_admin,
      })),
    options: {
      failureMessage: '유저 정보 조회 실패',
      onError: (e) => console.error('[userService]', e),
    },
  })
}
