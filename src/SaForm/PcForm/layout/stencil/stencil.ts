import { ElementType } from '../../../element'
import type { NativeStencil } from '../../../layout/stencil'
import type { PcGraph } from '../../graph'

// TODO: use svg
export const pcStencilIcons: Record<ElementType, string> = {
  [ElementType.Canvas]: '',
  [ElementType.Container]: 'iconzidingyikongjian',
  [ElementType.Text]: 'iconjingtaiwenbenkuang',
  [ElementType.Input]: 'icondanhangbianjikuang',
  [ElementType.Textarea]: 'iconduohangbianjikuang',
  [ElementType.Button]: 'iconanniu',
  [ElementType.Select]: 'iconxialabianjikuang',
  [ElementType.Radio]: 'icondanxuananniu',
  [ElementType.Checkbox]: 'iconfuxuananniu',
  [ElementType.Table]: 'iconliebiaokuang',
  [ElementType.Image]: 'icontupian',
  [ElementType.Tab]: 'iconTABye',
  [ElementType.Calendar]: 'iconriqikuang',
  [ElementType.Contextmenu]: 'iconyoujiancaidan',
  [ElementType.Tree]: 'iconshukongjian',
  [ElementType.Map]: 'iconditukongjian',
  [ElementType.Chart]: 'icontubiaokuang',
}

export const pcStencil: NativeStencil = <Graph = PcGraph>(graph: Graph) => ({
  groups: [
    { name: 'Container', collapsable: true },
    { name: 'Common', collapsable: true },
    { name: 'Input', collapsable: true },
    { name: 'Display', collapsable: true },
    { name: 'Feedback', collapsable: true },
  ],
  nodes: {
    Container: [
      {
        icon: pcStencilIcons[ElementType.Container],
        attrs: {
          type: ElementType.Container,
          name: 'Container',
          width: 200,
          height: 100,
          background: '',
        },
      },
      {
        icon: pcStencilIcons[ElementType.Tab],
        attrs: {
          type: ElementType.Tab,
          name: 'Tab',
          width: 200,
          height: 100,
          background: '',
        },
      },
    ],
    Common: [
      {
        icon: pcStencilIcons[ElementType.Text],
        attrs: {
          type: ElementType.Text,
          name: 'Text',
          width: 80,
          height: 60,
          background: '',
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
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
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
        },
      },
    ],
    Input: [
      {
        icon: pcStencilIcons[ElementType.Input],
        attrs: {
          type: ElementType.Input,
          name: 'Input',
          width: 150,
          height: 40,
          background: '',
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
        },
      },
      {
        icon: pcStencilIcons[ElementType.Textarea],
        attrs: {
          type: ElementType.Textarea,
          name: 'Textarea',
          width: 150,
          height: 60,
          background: '',
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
        },
      },
      {
        icon: pcStencilIcons[ElementType.Radio],
        attrs: {
          type: ElementType.Radio,
          name: 'Radio',
          width: 80,
          height: 40,
          background: '',
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
        },
      },
      {
        icon: pcStencilIcons[ElementType.Checkbox],
        attrs: {
          type: ElementType.Checkbox,
          name: 'Checkbox',
          width: 80,
          height: 40,
          background: '',
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
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
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
          options: [
            { label: 'Option A', value: 'Value A' },
            { label: 'Option B', value: 'Value B' },
          ],
        },
      },
    ],
    Display: [
      {
        icon: pcStencilIcons[ElementType.Table],
        attrs: {
          type: ElementType.Table,
          name: 'Table',
          width: 200,
          height: 100,
          background: '',
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
        },
      },
      {
        icon: pcStencilIcons[ElementType.Image],
        attrs: {
          type: ElementType.Image,
          name: 'Image',
          width: 200,
          height: 100,
          background: '',
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
        },
      },
      {
        icon: pcStencilIcons[ElementType.Tree],
        attrs: {
          type: ElementType.Tree,
          name: 'Tree',
          width: 100,
          height: 200,
          background: '',
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
        },
      },
      {
        icon: pcStencilIcons[ElementType.Chart],
        attrs: {
          type: ElementType.Chart,
          name: 'Chart',
          width: 200,
          height: 100,
          background: '',
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
        },
      },
      {
        icon: pcStencilIcons[ElementType.Calendar],
        attrs: {
          type: ElementType.Calendar,
          name: 'Calendar',
          width: 200,
          height: 100,
          background: '',
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
        },
      },
      {
        icon: pcStencilIcons[ElementType.Map],
        attrs: {
          type: ElementType.Map,
          name: 'Map',
          width: 200,
          height: 100,
          background: '',
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
        },
      },
    ],
    Feedback: [
      {
        icon: pcStencilIcons[ElementType.Contextmenu],
        attrs: {
          type: ElementType.Contextmenu,
          name: 'Contextmenu',
          width: 100,
          height: 150,
          background: '',
          'border-color': '#585858',
          'border-width': 1,
          'border-style': 'solid',
        },
      },
    ],
  },
})
