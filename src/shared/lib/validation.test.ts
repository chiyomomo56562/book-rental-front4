import { describe, it, expect } from 'vitest'
import { requiredString } from './validation'

describe('validation', () => {
  describe('requiredString', () => {
    it('required 메시지를 포함해야 한다', () => {
      const message = '필수 입력입니다.'
      const rule = requiredString(message)
      expect(rule.required).toBe(message)
    })

    it('문자열이 비어있지 않으면 true를 반환해야 한다', () => {
      const rule = requiredString('error')
      if (typeof rule.validate === 'function') {
        expect(rule.validate('hello')).toBe(true)
      }
    })

    it('공백만 있는 문자열이면 에러 메시지를 반환해야 한다', () => {
      const message = '필수 입력입니다.'
      const rule = requiredString(message)
      if (typeof rule.validate === 'function') {
        expect(rule.validate('   ')).toBe(message)
      }
    })

    it('빈 문자열이면 에러 메시지를 반환해야 한다', () => {
      const message = '필수 입력입니다.'
      const rule = requiredString(message)
      if (typeof rule.validate === 'function') {
        expect(rule.validate('')).toBe(message)
      }
    })
  })
})
