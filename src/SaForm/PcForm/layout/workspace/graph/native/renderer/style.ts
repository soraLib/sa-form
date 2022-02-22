import { omitBy } from 'lodash-es';
import { CSSProperties } from 'vue';
import { PcElement } from '../../../../../element';

/**
 * create element style
 */
export function createStyle(element: PcElement): CSSProperties {
  const styles: CSSProperties = {
    background: element.attrs.background,
    width: element.attrs.width + 'px',
    height: element.attrs.height + 'px',
    left: element.attrs.offsetX  + 'px',
    top: element.attrs.offsetY  + 'px'
  };

  return omitBy(styles, style => style === undefined);
}