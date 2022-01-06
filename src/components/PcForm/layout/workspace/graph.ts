import { Cell, Graph, JQuery } from '@antv/x6';
import { ElementType } from '../../../element';
import { getNextId } from '../../../utils/element';
import { PcDrawer } from '../../drawer';
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
export function copyNodes(drawer: PcDrawer) {
  drawer.clipboard.copy(drawer, { deep: true, useLocalStorage: true });
}

/** paste graph nodes */
export function pasteNodes(e: JQuery.ContextMenuEvent, parent: PcCell | undefined, drawer: PcDrawer) {
  if (drawer.clipboard.isEmpty(drawer.clipboard.clips) || !drawer.graph) return;

  if (parent && parent.data.type !== ElementType.Container) {
    return console.error(`[Sa error]: can not paste elements in ${ElementType[parent.data.type]}.`);
  }

  const rect = getSelectionRectangle(drawer.clipboard.clips.elements);

  console.log('rect',rect);

  const offsetX = rect.x - e.offsetX;
  const offsetY = rect.y - e.offsetY;

  const pastes = drawer.clipboard.paste(drawer, parent?.data.id, { deep: true, nodeProps: (ele) => ({
    id: drawer.getNextId(),
    offsetX: ele.attrs.offsetX - offsetX,
    offsetY: ele.attrs.offsetY - offsetY
  })});

  console.log('pastes', pastes)

  if(pastes) {
    drawer.graph.cleanSelection();
    drawer.graph.select(pastes?.map(p => p.attrs.id));
  }
}

/** cut graph nodes */
export function cutNodes(graph?: Graph) {
  if (!graph) return;

  const selected = graph.getSelectedCells();
  graph.cut(selected, { deep: true, useLocalStorage: true });
}