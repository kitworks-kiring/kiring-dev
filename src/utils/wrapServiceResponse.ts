type Options<T> = {
  fallbackData?: T
  successCode?: number
  successMessage?: string
  failureMessage?: string
  errorCode?: number
  onError?: (e: unknown) => void
}

/**
 * 비동기 비즈니스 로직을 수행하고, 예외 발생 시 튜플 형태[res, err]의 결과 반환 (try/catch 처리 추상화)
 *
 * @template T - 반환될 데이터의 타입
 * @param {Object} params - 파라미터 객체
 * @param {() => Promise<T>} params.fn - 실행할 비동기 함수
 * @param {Options<T>} [params.options] - 예외 처리 및 응답 메시지 옵션
 * @returns {Promise<[T | undefined, Error | null]>} - 성공 시 결과, 실패 시 error 반환
 */

export async function wrapServiceResponse<T>({
  fn,
  options = {},
}: {
  fn: () => Promise<T>
  options?: Options<T>
}): Promise<[T | undefined, Error | null]> {
  const { onError } = options
  try {
    const result = await fn()
    return [result, null]
  } catch (e) {
    if (onError) onError(e)
    const error = e instanceof Error ? e : new Error(String(e))
    console.error('❌ API 처리 중 에러:', error.message, error)

    return [undefined, error]
  }
}
