export const errorMessages: Record<string, string> = {
  // 클라이언트 요청 문제
  MISSING_REQUIRED_DATA: '필수 정보를 찾을 수 없습니다.',
  INVALID_REQUEST: '잘못된 요청입니다.',
  VALIDATION_FAILED: '입력 값이 유효하지 않습니다.',

  // 인증(Authentication) 관련
  NOT_KITREWORKS_MEMBER: '키트웍스 구성원만 가입이 가능합니다.',
  AUTHENTICATION_FAILED: '인증에 실패했습니다.',
  UNAUTHORIZED: '인증되지 않은 사용자입니다.',
  INVALID_TOKEN: '유효하지 않은 토큰입니다.',
  SESSION_EXPIRED: '세션이 만료되었습니다. 다시 로그인해주세요.',

  // 권한(Authorization) 관련
  PERMISSION_DENIED: '권한이 거부되었습니다.',

  // 리소스(Resource) 관련
  RESOURCE_NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  RESOURCE_CONFLICT: '이미 존재하는 리소스입니다.',

  // 요청 과부하
  RATE_LIMIT_EXCEEDED: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',

  // 서비스 문제
  SERVICE_UNAVAILABLE: '서비스가 일시적으로 이용이 불가합니다. 잠시 후 다시 시도해주세요',

  // 서버 내부 오류
  INTERNAL_SERVER_ERROR: '서버 내부 오류가 발생했습니다. 관리자에게 문의해주세요.',
}
