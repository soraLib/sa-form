import { ElementType } from '../../../element';
import { NativeStencil } from '../../../layout/sidebar';
import { PcDrawer } from '../../drawer';

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
        height: 40,
        background: '#eee'
      }
    }]
  }
});