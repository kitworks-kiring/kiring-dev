'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function ErrorPage() {
  const params = useSearchParams()
  const router = useRouter()
  const errorCode = params.get('code')

  const messageMap: Record<string, string> = {
    NOT_REGISTERED: '등록된 사용자만 접근할 수 있습니다.',
    AccessDenied: '로그인이 거부되었습니다.',
    // 그 외 커스텀 에러 코드
  }

  return (
    <div className="flex-col-cener h-full">
      <p className="mt-4">{messageMap[errorCode ?? ''] || '알 수 없는 오류가 발생했습니다.'}</p>
      <button type="button" onClick={() => router.push('/')}>
        홈으로 돌아가기
      </button>
    </div>
  )
}
