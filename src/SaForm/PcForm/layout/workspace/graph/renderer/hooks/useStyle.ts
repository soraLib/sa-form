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
    }

    return omitBy(styles, (style) => style === undefined)
  })
}
