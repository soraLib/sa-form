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
    },
  })

  const child1 = new PcElement({
    parent: canvas,
    attrs: {
      id: '2',
      type: ElementType.Button,
      name: 'mock button 1',
      width: 80,
      height: 45,
      x: 200,
      y: 100,
      background: '#50DA58',
    },
  })

  const child2 = new PcElement({
    parent: canvas,
    attrs: {
      type: ElementType.Button,
      id: '3',
      name: 'transparent button',
      width: 80,
      height: 40,
      x: 150,
      y: 200,
      background: '',
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
    },
  })

  canvas.children?.push(...[child1, child2, child3, child4])

  return canvas
}
