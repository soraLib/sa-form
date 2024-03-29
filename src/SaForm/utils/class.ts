export type Clazz = string | Clazz[] | Record<string | number, boolean>

/**
 * Build class
 */
const clazz = (...args: Clazz[]): string => {
  return args
    .filter((a) => a)
    .map((a) =>
      typeof a === 'string'
        ? a
        : Array.isArray(a)
        ? clazz(...a)
        : Object.entries(a)
            .filter(([, v]) => v)
            .map(([k]) => k)
            .filter((i) => i)
            .join(' ')
    )
    .filter((i) => i)
    .join(' ')
}

/**
 * Build classes
 */
export const useClazs = (...args: Clazz[]): string => {
  const r = clazz(...args)

  return r ? `${r}` : ''
}
