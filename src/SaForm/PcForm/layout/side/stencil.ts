import { ElementType } from '../../../element'
import { NativeStencil } from '../../../layout/sidebar'
import { PcGraph } from '../../graph'

export const NativePcSideStencil: NativeStencil = (graph: PcGraph) => ({
  groups: [
    { name: 'Normal', collapsable: true },
    { name: 'Container', collapsable: true }
  ],
  nodes: {
    Normal: [{
      icon: 'iconanniu', // use svg
      attrs: {
        type: ElementType.Button,
        name: 'Button',
        width: 80,
        height: 40,
        background: '#eee'
      }
    }]
  }
})