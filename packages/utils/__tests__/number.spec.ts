import { describe, expect, it } from 'vitest'
import { between } from '@sa/utils'

describe('number', () => {
  describe('between', () => {
    it('Is number inside a range', () => {
      expect(between(1, 1, 2)).toBe(true)
      expect(between(1, 2, 3)).toBe(false)
      expect(between(4, 2, 3)).toBe(false)
      expect(between(1, 1, 2, { from: true })).toBe(false)
      expect(between(2, 1, 2, { to: true })).toBe(false)
      expect(between(1, 1, 2, { from: true, to: true })).toBe(false)
      expect(between(2, 1, 2, { from: true, to: true })).toBe(false)
    })
  })
})
