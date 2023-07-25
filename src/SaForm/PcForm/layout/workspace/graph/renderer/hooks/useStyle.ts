import { computed } from 'vue'
import { omitBy } from 'lodash-es'
import type { CSSProperties, ComputedRef } from 'vue'
import type { PcElement } from '../../../../../element'

/**
 * Creates element container style.
 */
export function useElementStyle(
  element: PcElement
): ComputedRef<CSSProperties> {
  return computed(() => {
    const styles: CSSProperties = {
      left: `${element.attrs.x}px`,
      top: `${element.attrs.y}px`,
    }

    return omitBy(styles, (style) => style === undefined)
  })
}

export const createFontStyle = (element: PcElement): CSSProperties => {
  return {
    fontSize: `${element.attrs['font-size'] ?? 14}px`,
    color: element.attrs['font-color'] || 'inherit',
    fontFamily: element.attrs['font-family'] ?? 'auto',
    textDecoration: element.attrs['font-decoration'],
    fontWeight: element.attrs['font-style']?.startsWith('bold')
      ? 'bold'
      : 'inherit',
    fontStyle: element.attrs['font-style']?.endsWith('italic')
      ? 'italic'
      : 'inherit',
  }
}
export function useElementInnerStyle(
  element: PcElement
): ComputedRef<CSSProperties> {
  return computed(() => {
    const styles: CSSProperties = {
      width: `${element.attrs.width}px`,
      height: `${element.attrs.height}px`,
      background: element.attrs.background,
      borderStyle: element.attrs['border-style'],
      borderWidth: `${element.attrs['border-width'] ?? 0}px`,
      borderColor: element.attrs['border-color'],
      ...createFontStyle(element),
    }

    return omitBy(styles, (a) => a === undefined)
  })
}
