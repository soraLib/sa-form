import { describe, expect, it } from 'vitest'
import { group } from '@sa/utils'

describe('array', () => {
  describe('group', () => {
    it('splites array into groups', () => {
      expect(group([1, 2, 3, 4, 5, 6], 2)).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ])
      expect(group([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7],
      ])
    })
  })
})
