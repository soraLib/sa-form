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
      width: 180,
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
      type: ElementType.Container,
      id: '4',
      name: 'mock container',
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
    },
    children: [],
  })

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
      'align-vertical': 'center',
    },
  })

  canvas.children?.push(...[child1, child2, child3, child4])

  return canvas
}
