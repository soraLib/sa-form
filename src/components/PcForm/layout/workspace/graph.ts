import { Cell, JQuery } from '@antv/x6';
import { cloneDeep } from 'lodash-es';
import { Array as SaArray, findTreeNode } from 'sugar-sajs';
import { ElementType } from '../../../element';
import { BasicRecordType } from '../../../record';
import { PcDrawer } from '../../drawer';
import { PcRecord } from '../../record';
import { getSelectionRectangle, PcCell } from './utils';

/** remove graph nodes */
export function removeNodes(drawer?: PcDrawer, arg?: Cell[] | string[]) {
  if (!drawer?.graph) return;

  if (arg) {
    let ids: string[] = [];

    for(const item of arg) {
      if (typeof item === 'object') {
        ids.push(item.toJSON().id!);
      } else {
        ids.push(item);
      }
    }

    const elements = ids.map(id => findTreeNode(drawer.canvas.children!, node => node.attrs.id === id)!);

    const record = new PcRecord({
      type: BasicRecordType.Delete,
      time: new Date(),
      data: elements.map(element => ({
        prev: cloneDeep(element)
      }))
    });

    drawer.addRecord(record);

    drawer.graph.removeCells(ids);

    for(const element of elements) {
      if(element.parent?.children) {
        SaArray.remove(element.parent.children, child => child.attrs.id === element.attrs.id);
      }
    }

    return elements;
  }

  const selected = drawer.graph.getSelectedCells();
  if (selected.length) {
    removeNodes(drawer, selected);
  }
}

/** copy graph nodes */
export function copyNodes(drawer: PcDrawer) {
  drawer.clipboard.copy(drawer, { deep: true, useLocalStorage: true });
}

/** cut graph nodes */
export function cutNodes(drawer: PcDrawer) {
  drawer.clipboard.cut(drawer, { deep: true, useLocalStorage: true });
}

/** paste graph nodes */
export function pasteNodes(e: JQuery.ContextMenuEvent, parent: PcCell | undefined, drawer: PcDrawer) {
  if (drawer.clipboard.isEmpty(drawer.clipboard.clips) || !drawer.graph) return;

  if (parent && parent.data.type !== ElementType.Container) {
    return console.error(`[Sa error]: can not paste elements in ${ElementType[parent.data.type]}.`);
  }

  const rect = getSelectionRectangle(drawer.clipboard.clips.elements);

  const offsetX = rect.x - e.offsetX;
  const offsetY = rect.y - e.offsetY;

  const pastes = drawer.clipboard.paste(drawer, parent?.data.id, { deep: true, nodeProps: (ele) => ({
    id: drawer.getNextId(),
    offsetX: ele.attrs.offsetX - offsetX,
    offsetY: ele.attrs.offsetY - offsetY
  })});

  if(pastes) {
    drawer.graph.cleanSelection();
    drawer.graph.select(pastes?.map(p => p.attrs.id));
  }
}