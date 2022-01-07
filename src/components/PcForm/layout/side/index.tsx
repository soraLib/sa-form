import { Shape } from '@antv/x6';
import { SideStencil } from '../../../layout/sidebar';
import { PcDrawer } from '../../drawer';
import { getPcDragNode, getPcDropNode } from './drag';

export const PcSideStencil: SideStencil = (drawer: PcDrawer) => ({
  groups: [
    { name: 'Normal', collapsable: true },
    { name: 'Container', collapsable: true }
  ],
  getDragNode: (node) => getPcDragNode(node, drawer),
  getDropNode: (node) => getPcDropNode(node, drawer),
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
})