import { ElementType } from '../../../element'
import { PcElement } from '../../element'

export const createMockPcCanvas: () => PcElement = () => {
  const canvas = new PcElement({
    parent: undefined,
    children: [],
    attrs: {
      type: ElementType.Canvas,
      id: '1',
      name: 'mock pc form',
      width: 1500,
      height: 1000,
      x: 0,
      y: 0,
      background: '',
      'font-size': 24,
      'font-family': 'Arial',
      'font-color': '',
      'font-decoration': 'none',
      'font-style': 'normal',
    },
  })

  const child1 = new PcElement({
    parent: canvas,
    attrs: {
      id: '2',
      type: ElementType.Text,
      name: 'transparent text',
      width: 210,
      height: 80,
      x: 250,
      y: 100,
      background: '',
      'border-style': 'none',
      'border-color': '',
      'border-width': 1,
      'font-size': 24,
      'font-family': 'Arial',
      'font-color': '#17F1C2FF',
      'font-decoration': 'underline',
      'font-style': 'bold',
      'align-vertical': 'start',
      'align-horizontal': 'center',
    },
  })

  const child2 = new PcElement({
    parent: canvas,
    attrs: {
      type: ElementType.Button,
      id: '3',
      name: 'button',
      width: 80,
      height: 40,
      x: 170,
      y: 180,
      background: '#50DA58',
      'border-width': 2,
      'border-style': 'double',
      'border-color': '#B30E79FF',
      'font-size': 14,
      'font-family': 'Arial',
      'font-color': '',
      'font-decoration': 'none',
      'font-style': 'bold-italic',
      'align-horizontal': 'center',
      'align-vertical': 'center',
    },
  })

  const child3 = new PcElement({
    parent: canvas,
    attrs: {
      type: ElementType.Tab,
      id: '4',
      name: 'mock tab',
      width: 400,
      height: 200,
      x: 50,
      y: 400,
      background: '#EFAE46',
      'border-width': 8,
      'border-style': 'solid',
      'border-color': 'rgba(82, 82, 89, 0.68)',
      'border-radius': 14,
      'font-size': 14,
      'font-family': 'Arial',
      'font-color': '',
      'font-decoration': 'none',
      'font-style': 'normal',
      'tab-height': 40,
      'tab-index': 0,
    },
    tabs: [
      {
        id: 'Pane A',
        label: 'Pane A',
        children: [],
      },
      {
        id: 'Pane B',
        label: 'Pane B',
        children: [],
      },
    ],
  })

  child3.tabs?.[0].children.push(
    new PcElement({
      parent: child3,
      attrs: {
        id: '6',
        type: ElementType.Text,
        name: 'A',
        width: 100,
        height: 40,
        x: 100,
        y: 50,
        background: '',
        'border-style': 'solid',
        'border-color': '#17F1C2FF',
        'border-width': 1,
        'font-size': 24,
        'font-family': 'Arial',
        'font-color': '#17F1C2FF',
        'font-decoration': 'underline',
        'font-style': 'bold',
        'align-vertical': 'start',
        'align-horizontal': 'center',
      },
    })
  )
  child3.tabs?.[1].children.push(
    new PcElement({
      parent: child3,
      attrs: {
        id: '7',
        type: ElementType.Text,
        name: 'B',
        width: 80,
        height: 40,
        x: 120,
        y: 50,
        background: '',
        'border-style': 'solid',
        'border-color': '#2160FFFF',
        'border-width': 1,
        'font-size': 24,
        'font-family': 'Arial',
        'font-color': '#2160FFFF',
        'font-decoration': 'underline',
        'font-style': 'bold',
        'align-vertical': 'start',
        'align-horizontal': 'center',
      },
    })
  )

  const child4 = new PcElement({
    parent: canvas,
    attrs: {
      type: ElementType.Select,
      id: '5',
      name: 'Mock Select',
      width: 200,
      height: 60,
      x: 1200,
      y: 400,
      background: '#4d85ff',
      options: [
        {
          label: 'Option A',
          value: 'Value A',
        },
        {
          label: 'Option B',
          value: 'Value B',
        },
      ],
      'border-style': 'solid',
      'border-width': 1,
      'border-color': 'rgba(82, 82, 89, 0.68)',
      'font-size': 14,
      'font-family': 'Arial',
      'font-color': '',
      'font-decoration': 'none',
      'font-style': 'normal',
      'align-horizontal': 'flex-start',
      'align-vertical': 'center',
    },
  })

  const draftChild1 = new PcElement({
    parent: canvas,
    attrs: {
      type: ElementType.Image,
      id: '8',
      name: 'Mock Draft Image',
      width: 200,
      height: 180,
      x: 400,
      y: 220,
      background: '#4d85ff',
      'is-draft': true,
      'border-style': 'solid',
      'border-width': 1,
      'border-color': 'rgba(82, 82, 89, 0.68)',
      'font-size': 14,
      'font-family': 'Arial',
      'font-color': '',
      'font-decoration': 'none',
      'font-style': 'normal',
      'align-horizontal': 'center',
      'align-vertical': 'center',
    },
  })

  const draftChild2 = new PcElement({
    parent: canvas,
    attrs: {
      type: ElementType.Contextmenu,
      id: '9',
      name: 'Mock Draft Cotextmneu',
      width: 250,
      height: 180,
      x: 1200,
      y: 350,
      background: '#D05087FF',
      'is-draft': true,
      'border-style': 'solid',
      'border-width': 1,
      'border-color': 'rgba(82, 82, 89, 0.68)',
      'font-size': 14,
      'font-family': 'Arial',
      'font-color': '',
      'font-decoration': 'none',
      'font-style': 'normal',
      'align-horizontal': 'center',
      'align-vertical': 'center',
      'contextmenu-binds': [child2.attrs.id],
    },
  })

  canvas.children?.push(
    ...[child1, child2, child3, child4, draftChild1, draftChild2]
  )

  return canvas
}
