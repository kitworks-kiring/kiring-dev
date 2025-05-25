'use client'

import { signIn } from 'next-auth/react'

export default function SignInPage() {
  const handleKakaoLogin = () => {
    signIn('kakao', { callbackUrl: '/' })
  }

  return (
    <div className="flex-row-center h-full">
      <button onClick={handleKakaoLogin} className="bg-system-yellow rounded-lg px-6 py-3">
        카카오 로그인
      </button>
    </div>
  )
}
