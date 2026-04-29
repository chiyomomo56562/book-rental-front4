/**
 * 필수 문자열 필드를 검증합니다. (공백 제외)
 */
export const requiredString = (message: string) => ({
  required: message,
  validate: (value: string) => value.trim().length > 0 || message,
})
