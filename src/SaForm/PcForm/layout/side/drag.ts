import { ElementType } from '../../../element'
import { PcGraph } from '../../graph'
import { PcElement } from '../../element'
import { createPcNode, PcNode } from '../workspace/nodes'

export function getPcDragNode(node: PcNode, graph: PcGraph): PcNode {
  return getPcStencilNode(node, graph)
}

export function getPcDropNode(node: PcNode, graph: PcGraph): PcNode {
  return getPcStencilNode(node, graph)
}

function getPcStencilNode(node: PcNode, graph: PcGraph): PcNode {
  const nextId = graph.getNextId()
  const parent = graph.canvas

  switch (node.data.name) {
    case 'Button': {
      return createPcNode({
        attrs: {
          id: nextId,
          name: 'Button',
          width: 80,
          height: 40,
          type: ElementType.Button,
          x: 0,
          y: 0
        },
        parent: parent
      })
    }

    case 'Select': {
      return createPcNode({
        attrs: {
          id: nextId,
          name: 'Select',
          width: 80,
          height: 40,
          type: ElementType.Select,
          x: 0,
          y: 0,
          options: [{ name: 'default' }]
        },
        parent: parent
      })
    }

    case 'Container': {
      return createPcNode({
        attrs: {
          id: nextId,
          name: 'Container',
          width: 200,
          height: 100,
          type: ElementType.Container,
          x: 0,
          y: 0
        },
        parent: parent
      })
    }

    default: {
      console.error('[Sa error]: unexpected drag node', node)
    }
  }

  return node
}
