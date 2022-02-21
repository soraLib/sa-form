import { CSSProperties } from 'vue';
import { PcElement } from '../../../../../element';

/**
 * create element style
 */
export function createStyle(element: PcElement): CSSProperties {

  return {
    width: element.attrs.width + 'px',
    height: element.attrs.height + 'px',
    left: element.attrs.offsetX  + 'px',
    top: element.attrs.offsetY  + 'px'
  };
}