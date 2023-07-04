import { ElementType } from '../../../element'
import type { NativeStencil } from '../../../layout/sidebar'
import type { PcGraph } from '../../graph'

export const NativePcSideStencil: NativeStencil = (graph: PcGraph) => ({
  groups: [
    { name: 'Normal', collapsable: true },
    // { name: 'Container', collapsable: true }
  ],
  nodes: {
    Normal: [
      {
        icon: 'iconjingtaiwenbenkuang', // TODO: use svg
        attrs: {
          type: ElementType.Text,
          name: 'Text',
          width: 80,
          height: 60,
          background: '#eee',
        },
      },
      {
        icon: 'iconanniu',
        attrs: {
          type: ElementType.Button,
          name: 'Button',
          width: 80,
          height: 40,
          background: '#eee',
        },
      },
      {
        icon: 'iconxialabianjikuang',
        attrs: {
          type: ElementType.Select,
          name: 'Select',
          width: 100,
          height: 40,
          background: '#eee',
        },
      },
    ],
  },
})
