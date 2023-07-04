import { omitBy } from 'lodash-es'
import type { CSSProperties } from 'vue'
import type { PcElement } from '../../../../../element'

/**
 * Creates element style.
 */
export function useElementStyle(element: PcElement): CSSProperties {
  const styles: CSSProperties = {
    background: element.attrs.background,
    width: `${element.attrs.width}px`,
    height: `${element.attrs.height}px`,
    left: `${element.attrs.x}px`,
    top: `${element.attrs.y}px`,
  }

  return omitBy(styles, (style) => style === undefined)
}
