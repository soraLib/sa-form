import { computed } from 'vue'
import { omitBy } from 'lodash-es'
import type { CSSProperties, ComputedRef } from 'vue'
import type { PcElement } from '../../../../../element'

/**
 * Creates element style.
 */
export function useElementStyle(
  element: PcElement
): ComputedRef<CSSProperties> {
  return computed(() => {
    const styles: CSSProperties = {
      background: element.attrs.background,
      width: `${element.attrs.width}px`,
      height: `${element.attrs.height}px`,
      left: `${element.attrs.x}px`,
      top: `${element.attrs.y}px`,
      borderStyle: element.attrs['border-style'],
      borderWidth: `${element.attrs['border-width'] ?? 0}px`,
      borderColor: element.attrs['border-color'],
    }

    return omitBy(styles, (style) => style === undefined)
  })
}
