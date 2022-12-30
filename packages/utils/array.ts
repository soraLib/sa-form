/**
 * Splits an array into a group of arrays by the count of per group.
 *
 * @example
 *
 * ```ts
 * expect(group([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
 *  [1, 2, 3],
 *  [4, 5, 6],
 *  [7],
 * ])
 * ```
 */
export const group = <T>(list: T[], count: number): T[][] =>
  Array.from({ length: Math.ceil(list.length / count) }).map((_, i) =>
    list.slice(i * count, (i + 1) * count)
  )
