import { ElementType } from '../../../element';
import { createElementByCell } from '../../../utils/element';
import { PcDrawer } from '../../drawer';
import { PcElement } from '../../element';
import { createPcNode, PcNode } from '../workspace/node';

export function getPcDragNode(node: PcNode, drawer: PcDrawer): PcNode {
  return getPcStencilNode(node, drawer);
}

export function getPcDropNode(node: PcNode, drawer: PcDrawer): PcNode {
  return getPcStencilNode(node, drawer);
}

export function pcValidateNode(node: PcNode, drawer: PcDrawer): boolean {
  // create record
  const position = node.getProp<{x: number; y: number}>('position');
  node.data.offsetX = position.x;
  node.data.offsetY = position.y;

  const addedNode = createElementByCell(node, PcElement, drawer);

  drawer.addChild(addedNode);

  return true;
}

function getPcStencilNode(node: PcNode, drawer: PcDrawer): PcNode {
  const nextId = drawer.getNextId();
  const parent = drawer.canvas;

  console.log(node);

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
