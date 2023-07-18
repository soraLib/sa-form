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

export const pcStencil: NativeStencil = <Graph = PcGraph>(graph: Graph) => ({
  groups: [
    { name: 'Container', collapsable: true },
    { name: 'Normal', collapsable: true },
  ],
  nodes: {
    Container: [
      {
        icon: pcStencilIcons[ElementType.Container],
        attrs: {
          type: ElementType.Container,
          name: 'Container',
          width: 200,
          height: 160,
          background: '',
        },
      },
    ],
    Normal: [
      {
        icon: pcStencilIcons[ElementType.Text],
        attrs: {
          type: ElementType.Text,
          name: 'Text',
          width: 80,
          height: 60,
          background: '',
        },
      },
      {
        icon: pcStencilIcons[ElementType.Button],
        attrs: {
          type: ElementType.Button,
          name: 'Button',
          width: 80,
          height: 40,
          background: '',
        },
      },
      {
        icon: pcStencilIcons[ElementType.Select],
        attrs: {
          type: ElementType.Select,
          name: 'Select',
          width: 100,
          height: 40,
          background: '',
          options: [
            { label: 'Option A', value: 'Value A' },
            { label: 'Option B', value: 'Value B' },
          ],
        },
      },
    ],
  },
})
