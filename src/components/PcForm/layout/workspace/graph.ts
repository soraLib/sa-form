import { Cell, Graph, JQuery } from '@antv/x6';
import { ElementType } from '../../../element';
import { getSelectionRectangle, PcCell } from './utils';

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
export function pasteNodes(e?: JQuery.ContextMenuEvent, parent?: PcCell, graph?: Graph) {
  if (!graph || graph.isClipboardEmpty()) return;

  if (parent && parent.data.type !== ElementType.Container) {
    return console.error(`[Sa error]: can not paste elements in ${ElementType[parent.data.type]}.`);
  }

  const cells = graph.paste({ useLocalStorage: true, offset: 0 });
  const rect = getSelectionRectangle(cells);

  const offsetX = rect.x - e.offsetX;
  const offsetY = rect.y - e.offsetY;

  for (const cell of cells) {
    const prop = cell.getProp<{x: number; y: number}>('position');
    cell.setProp('position', { x: prop.x - offsetX, y: prop.y - offsetY });
    cell.toFront();

    if (parent) {
      cell.setParent(parent);
      parent.addChild(cell);
    }
  }

  graph.cleanSelection();
  graph.select(cells);
}

/** cut graph nodes */
export function cutNodes(graph?: Graph) {
  if (!graph) return;

  const selected = graph.getSelectedCells();
  graph.cut(selected, { deep: true, useLocalStorage: true });
}