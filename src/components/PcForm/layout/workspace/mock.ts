import { ElementType } from '../../../element';
import { PcElement } from '../../element';

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
      offsetX: 0,
      offsetY: 0
    }
  });

  const child1 = new PcElement({
    parent: canvas,
    attrs: {
      id: '2',
      type: ElementType.Button,
      name: 'mock button 1',
      width: 80,
      height: 40,
      offsetX: 200,
      offsetY: 100
    }
  });

  const child2 = new PcElement({
    parent: canvas,
    attrs: {
      type: ElementType.Button,
      id: '3',
      name: 'mock button 2',
      width: 80,
      height: 40,
      offsetX: 150,
      offsetY: 200
    }
  });

  const child3 = new PcElement({
    parent: canvas,
    attrs: {
      type: ElementType.Container,
      id: '4',
      name: 'mock container',
      width: 400,
      height: 200,
      offsetX: 50,
      offsetY: 300
    }
  });

  canvas.children?.push(...[child1, child2, child3]);

  return canvas;
};