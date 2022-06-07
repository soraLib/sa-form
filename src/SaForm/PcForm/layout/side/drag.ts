import { ElementType } from '../../../element';
import { PcDrawer } from '../../drawer';
import { PcElement } from '../../element';
import { createPcNode, PcNode } from '../workspace/nodes';

export function getPcDragNode(node: PcNode, drawer: PcDrawer): PcNode {
  return getPcStencilNode(node, drawer);
}

export function getPcDropNode(node: PcNode, drawer: PcDrawer): PcNode {
  return getPcStencilNode(node, drawer);
}

function getPcStencilNode(node: PcNode, drawer: PcDrawer): PcNode {
  const nextId = drawer.getNextId();
  const parent = drawer.canvas;

  switch (node.data.name) {
    case 'Button': {
      return createPcNode({
        attrs: {
          id: nextId,
          name: 'Button',
          width: 80,
          height: 40,
          type: ElementType.Button,
          offsetX: 0,
          offsetY: 0
        },
        parent: parent
      });
    }

    case 'Select': {
      return createPcNode({
        attrs: {
          id: nextId,
          name: 'Select',
          width: 80,
          height: 40,
          type: ElementType.Select,
          offsetX: 0,
          offsetY: 0,
          options: [{ name: 'default' }]
        },
        parent: parent
      });
    }

    case 'Container': {
      return createPcNode({
        attrs: {
          id: nextId,
          name: 'Container',
          width: 200,
          height: 100,
          type: ElementType.Container,
          offsetX: 0,
          offsetY: 0
        },
        parent: parent
      });
    }

    default: {
      console.error('[Sa error]: unexpected drag node', node);
    }
  }

  return node;
}
