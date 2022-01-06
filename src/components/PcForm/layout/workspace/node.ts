import { Node, Shape } from '@antv/x6';
import { ElementType } from '../../../element';
import { PcElement } from '../../element';

export interface PcNode extends Node {
  data: PcElement['attrs'];
}

export function createPcNode(element: PcElement): PcNode {
  const baseNodeConfig = Object.assign({
    id: element.attrs.id,
    x: element.attrs.offsetX,
    y: element.attrs.offsetY,
    width: element.attrs.width,
    height: element.attrs.height,
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