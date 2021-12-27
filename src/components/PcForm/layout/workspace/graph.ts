import { Cell, Graph } from '@antv/x6';

/** remove graph nodes */
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

/** copy graph nodes */
export function copyNodes(graph?: Graph) {
  if (!graph) return;

  const selected = graph.getSelectedCells();
  graph.copy(selected, { deep: true, useLocalStorage: true });
}

/** paste graph nodes */
export function pasteNodes(graph?: Graph) {
  if (!graph) return;

  const cells = graph.paste({ useLocalStorage: true });
  graph.cleanSelection();
  graph.select(cells);
}

/** cut graph nodes */
export function cutNodes(graph?: Graph) {
  if (!graph) return;

  const selected = graph.getSelectedCells();
  graph.copy(selected, { deep: true, useLocalStorage: true });

  for (const cell of selected) {
    removeNode(graph, cell);
  }
}