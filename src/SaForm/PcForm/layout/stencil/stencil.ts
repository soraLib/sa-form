import { ElementType } from '../../../element'
import type { NativeStencil } from '../../../layout/stencil'
import type { PcGraph } from '../../graph'

// TODO: use svg
export const pcStencilIcons: Record<ElementType, string> = {
  [ElementType.Canvas]: '',
  [ElementType.Container]: 'iconzidingyikongjian',
  [ElementType.Text]: 'iconjingtaiwenbenkuang',
  [ElementType.Button]: 'iconanniu',
  [ElementType.Select]: 'iconxialabianjikuang',
}

export const NativePcSideStencil: NativeStencil = <Graph = PcGraph>(
  graph: Graph
) => ({
  groups: [
    { name: 'Normal', collapsable: true },
    // { name: 'Container', collapsable: true }
  ],
  nodes: {
    Normal: [
      {
        icon: pcStencilIcons[ElementType.Text],
        attrs: {
          type: ElementType.Text,
          name: 'Text',
          width: 80,
          height: 60,
          background: '#eee',
        },
      },
      {
        icon: pcStencilIcons[ElementType.Button],
        attrs: {
          type: ElementType.Button,
          name: 'Button',
          width: 80,
          height: 40,
          background: '#eee',
        },
      },
      {
        icon: pcStencilIcons[ElementType.Select],
        attrs: {
          type: ElementType.Select,
          name: 'Select',
          width: 100,
          height: 40,
          background: '#eee',
          options: [
            { label: 'Option A', value: 'Value A' },
            { label: 'Option B', value: 'Value B' },
          ],
        },
      },
    ],
  },
})
