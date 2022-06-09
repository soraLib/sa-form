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
      width: 800,
      height: 600,
      x: 0,
      y: 0
    }
  })

  const child1 = new PcElement({
    parent: canvas,
    attrs: {
      id: '2',
      type: ElementType.Button,
      name: 'mock button 1',
      width: 80,
      height: 40,
      x: 200,
      y: 100,
      background: '#eee'
    }
  })

  const child2 = new PcElement({
    parent: canvas,
    attrs: {
      type: ElementType.Button,
      id: '3',
      name: 'mock button 2',
      width: 80,
      height: 40,
      x: 150,
      y: 200,
      background: '#000'
    }
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
      y: 300,
      background: '#964B4B'
    },
    children: []
  })

  canvas.children?.push(...[child1, child2, child3])

  return canvas
}