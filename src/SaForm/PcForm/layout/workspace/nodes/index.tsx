import { Node, Shape } from '@antv/x6';
import { VueShape } from '@antv/x6-vue-shape';
import { ElementType } from '../../../../element';
import { PcElement } from '../../../element';
import PcSelect from './components/select';

export interface PcNode extends Node {
  data: PcElement['attrs'];
}

/** create pc x6 node */
export function createPcNode(element: PcElement) {
  const baseNodeConfig = Object.assign({
    id: element.attrs.id,
    x: element.attrs.offsetX,
    y: element.attrs.offsetY,
    width: element.attrs.width,
    height: element.attrs.height
  }, { data: element.attrs });

  switch (element.attrs.type) {
    case ElementType.Button: {
      return new Shape.Rect({
        ...baseNodeConfig,
        attrs: {
          rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 1 },
          text: { text: ElementType[element.attrs.type], fill: 'white' }
        }
      });
    }

    case ElementType.Select: {
      return new VueShape({
        ...baseNodeConfig,
        shape: 'vue-shape',
        component: {
          render: () => <PcSelect />
        }
      });
    }

    case ElementType.Container: {
      return new Shape.Rect({
        ...baseNodeConfig,
        attrs: {
          rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 1 }
        }
      });
    }

    default: {
      throw new Error(`[Sa error]: unexpected element type ${element.attrs.type}.`);
    }
  }
}