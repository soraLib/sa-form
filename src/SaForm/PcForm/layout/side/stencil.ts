import { Shape } from '@antv/x6';
import { ElementType } from '../../../element';
import { NativeStencil, SideStencil } from '../../../layout/sidebar';
import { PcDrawer } from '../../drawer';
import { getPcDragNode, getPcDropNode, pcValidateNode } from './drag';

export const X6PcSideStencil: SideStencil = (drawer: PcDrawer) => ({
  groups: [
    { name: 'Normal', collapsable: true },
    { name: 'Container', collapsable: true }
  ],
  getDragNode: (node) => getPcDragNode(node, drawer),
  getDropNode: (node) => getPcDropNode(node, drawer),
  validateNode: (node) => pcValidateNode(node, drawer),
  nodes: {
    Normal: [
      new Shape.Rect({
        width: 80,
        height: 40,
        attrs: {
          rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 1 },
          text: { text: 'Button', fill: 'white' }
        },
        data: { name: 'Button' }
      }),
      new Shape.Rect({
        width: 80,
        height: 40,
        attrs: {
          rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 1 },
          text: { text: 'Select', fill: 'white' }
        },
        data: { name: 'Select' }
      })
    ],
    Container: [
      new Shape.Rect({
        width: 80,
        height: 40,
        attrs: {
          rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 1 },
          text: { text: 'Container', fill: 'white' }
        },
        data: { name: 'Container' }
      })
    ]
  }
});

export const NativePcSideStencil: NativeStencil = (drawer: PcDrawer) => ({
  groups: [
    { name: 'Normal', collapsable: true },
    { name: 'Container', collapsable: true }
  ],
  nodes: {
    Normal: [{
      icon: 'iconanniu',
      attrs: {
        type: ElementType.Button,
        name: 'Button',
        width: 80,
        height: 40
      }
    }]
  }
});