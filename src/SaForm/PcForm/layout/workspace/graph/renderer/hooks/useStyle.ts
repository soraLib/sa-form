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

export const createBorderStyle = (element: PcElement): CSSProperties => {
  return {
    borderStyle: element.attrs['border-style'],
    borderWidth: `${element.attrs['border-width'] ?? 0}px`,
    borderRadius: `${element.attrs['border-radius'] ?? 0}px`,
    borderColor: element.attrs['border-color'],
  }
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
export const createAlignStyle = (element: PcElement): CSSProperties => {
  return {
    display: 'flex',
    alignItems: element.attrs['align-vertical'] ?? 'start',
    justifyContent: element.attrs['align-horizontal'] ?? 'flex-start',
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
      ...createBorderStyle(element),
      ...createFontStyle(element),
      ...createAlignStyle(element),
    }

    return omitBy(styles, (a) => a === undefined)
  })
}
