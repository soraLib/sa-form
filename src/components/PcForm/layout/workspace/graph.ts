import { Cell, Graph } from '@antv/x6';

export function removeNode(graph?: Graph, arg?: Cell | string) {
  if (!graph) return;

  let id: string;

  if (arg) {
    if (typeof arg === 'object') {
      id = arg.toJSON().id!;
    } else {
      id = arg;
    }

    return graph.removeNode(id);
  }

  const selected = graph.getSelectedCells();
  if (selected.length) {
    for (const cell of selected) {
      removeNode(graph, cell);
    }
  }
}