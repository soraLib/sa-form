export type BetweenExclude = {
  from?: boolean
  to?: boolean
}

/**
 * Returns whether a value is between a range.
 *
 * @example
 *
 * ```ts
 * expect(between(1, 1, 2)).toBe(true)
 * expect(between(1, 2, 3)).toBe(false)
 * expect(between(1, 1, 2, { from: true })).toBe(false)
 * expect(between(2, 1, 2, { to: true })).toBe(false)
 * expect(between(1, 1, 2, { from: true, to: true })).toBe(false)
 * expect(between(2, 1, 2, { from: true, to: true })).toBe(false)
 * ```
 */
export const between = (
  value: number,
  from: number,
  to: number,
  exclude: BetweenExclude = { from: false, to: false }
) => {
  if (exclude.from) {
    if (value <= from) return false
    return exclude.to ? value < to : value <= to
  }

  if (value < from) return false
  return exclude.to ? value < to : value <= to
}
