import { describe, expect, it } from 'vitest'
import { addUnit } from '@sa/utils'

describe('dom style', () => {
  describe('addUnit', () => {
    it('Adds unit to a value', () => {
      expect(addUnit()).toBe('')
      expect(addUnit('100px')).toBe('100px')
      expect(addUnit(0)).toBe('0px')
      expect(addUnit(100)).toBe('100px')
      expect(addUnit(100, 'em')).toBe('100em')
    })
  })
})
