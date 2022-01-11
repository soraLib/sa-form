import { Cell, Graph } from '@antv/x6';
import { BasicDrawer, DrawerType } from '../drawer';
import { BasicElement } from '../element';
import { BasicRecordStore, BasicRecordType, isCDRecordDataList, isURecordData, isURecordDataList } from '../record';
import { PcElement, PcElementAttributes } from './element';
import { PcRecord, PcRecordStore } from './record';

import { findNode, findTreeNode, removeTreeNode, setObjectValues } from 'sugar-sajs';
import { cloneDeep, pick } from 'lodash-es';
import { getCellRecProp } from './layout/workspace/utils';
import { getNextId, setGraphSelected } from '../utils/element';
import { PcClipBoard } from './clipboard';
import { createPcNode } from './layout/workspace/node';

export const NEED_UPDATE_GRAPH_PROPERTIES: (keyof PcElementAttributes)[] = ['offsetX', 'offsetY', 'width', 'height'];

type IdUpdateData = { id: string, data: Partial<PcElement['attrs']> };
type ElUpdateData = { element: PcElement, data: Partial<PcElement['attrs']> };

function isIdUpdateData(data: IdUpdateData | ElUpdateData): data is IdUpdateData {
  return Reflect.has(data, 'id');
}

/** pc drawer */
export class PcDrawer implements BasicDrawer {
  type: DrawerType;
  canvas: PcElement;
  history: BasicRecordStore;
  clipboard: PcClipBoard;
  selected: PcElement[] = [];
  graph: Graph | undefined;
  nextId: string;

  constructor(config: Partial<PcElement> & {attrs: {}}) {
    this.type = 'PcForm';
    this.history = new PcRecordStore();
    this.clipboard = new PcClipBoard();
    this.nextId = '1';
    this.canvas = new PcElement({
      parent: undefined,
      children: [],
      attrs: config.attrs
    });
  }

  setCanvas(canvas: PcElement) {
    this.canvas = canvas;
    this.selected = [canvas];

    this.nextId = getNextId(canvas);
  }

  setGraph(graph: Graph) {
    this.graph = graph;
  }

  getNextId() {
    const nextId = this.nextId;
    this.nextId = String(Number(nextId) + 1);

    return nextId;
  }

  /** add child and return its parent */
  addChild(child: PcElement, parent?: PcElement): PcElement;
  addChild(child: PcElement, parent?: string): PcElement;
  addChild(child: PcElement, arg?: string | PcElement): PcElement {
    const parent = (typeof arg === 'string' ? findTreeNode(this.canvas.children!, node => node.attrs.id === arg) : arg) ?? this.canvas;

    addDrawerNode(this, child);

    // skip add record when it's undo or redo
    const record = new PcRecord({
      type: BasicRecordType.Add,
      time: new Date,
      data: [{
        next: {
          ...cloneDeep(child)
        }
      }]
    });

    this.addRecord(record);
    this.setSelected(child);

    return parent;
  }

  /** add children and return their parent */
  addChildren(children: PcElement[], parent?: PcElement): PcElement;
  addChildren(children: PcElement[], parent?: string): PcElement;
  addChildren(children: PcElement[], arg?: string | PcElement): PcElement {
    const parent = (typeof arg === 'string' ? findTreeNode(this.canvas.children!, node => node.attrs.id === arg) : arg) ?? this.canvas;

    for (const child of children) {
      addDrawerNode(this, child);
    }

    // skip add record when it's undo or redo
    const record = new PcRecord({
      type: BasicRecordType.Add,
      time: new Date,
      data: children.map(child => ({
        next: {
          ...cloneDeep(child)
        }
      }))
    });

    this.addRecord(record);
    this.setSelected(children);

    return parent;
  }

  setSelected(): PcElement | undefined;
  setSelected(id: string): PcElement | undefined;
  setSelected(ids: string[]): PcElement[];
  setSelected(element: PcElement): PcElement;
  setSelected(elements: PcElement[]): PcElement[];
  setSelected(arg?: string | string[] | PcElement | PcElement[]) {
    if (!this.graph) return;

    if (!arguments.length || (Array.isArray(arg) && !arg.length)) {
      this.selected = [this.canvas];

      return this.canvas;
    }

    if (!this.canvas.children) return;

    if (typeof arg === 'string') {
      const node = findNode(this.canvas, node => node.attrs.id === arg);

      if (node) {
        this.selected = [node];
        setGraphSelected(arg, this.graph);
      }

      return node;
    }

    if (Array.isArray(arg)) {
      const selected: PcElement[] = [];

      for (const item of arg) {
        if (typeof item === 'string') {
          const node = findNode(this.canvas, node => node.attrs.id === item);
          if (node) selected.push(node);
        } else {
          selected.push(item);
        }
      }

      setGraphSelected(selected.map(item => item.attrs.id), this.graph);
      this.selected = selected;

      return selected;
    }

    if (typeof arg === 'object') {
      this.selected = [arg];
      setGraphSelected(arg.attrs.id, this.graph);

      return arg;
    }
  }

  updateElemData(id: string, data: Partial<PcElement['attrs']>, needRecord?: boolean): PcElement | undefined;
  updateElemData(element: PcElement, data: Partial<PcElement['attrs']>, needRecord?: boolean): PcElement | undefined;
  updateElemData(arg: string | PcElement, data: Partial<PcElement['attrs']>, needRecord = true) {
    if (!arg) return;

    const element = typeof arg === 'string' ? findNode(this.canvas, node => node.attrs.id === arg) : arg;

    if (!element) return undefined;

    if (needRecord) {
      const record = new PcRecord({
        type: BasicRecordType.Attr,
        time: new Date(),
        data: [{
          id: element.attrs.id,
          prev: cloneDeep(pick(element.attrs, Object.keys(data))),
          next: cloneDeep(data)
        }]
      });

      this.addRecord(record);
    }

    nodeDataChangeHook(this, element.attrs.id, data);

    setObjectValues(element.attrs, data);

    return element;
  }

  updateElemsData(data: IdUpdateData[]): PcElement[] | undefined;
  updateElemsData(data: ElUpdateData[]): PcElement[] | undefined;
  updateElemsData(arg: IdUpdateData[] | ElUpdateData[]) {
    const batch = arg.map(data => ({
      el: isIdUpdateData(data) ? findNode(this.canvas, node => node.attrs.id === data.id)! : data.element,
      data: data.data
    }));

    const record = new PcRecord({
      type: BasicRecordType.Attr,
      time: new Date(),
      data: batch.map(u => ({
        id: u.el.attrs.id,
        prev: cloneDeep(pick(u.el.attrs, Object.keys(u.data))),
        next: cloneDeep(u.data)
      }))
    });

    this.addRecord(record);

    for (const update of batch) {
      this.updateElemData(update.el, update.data, false);
    }

    return batch.map(u => u.el);
  }

  /** add history record */
  addRecord(record: PcRecord) {
    console.log('[Sa info]: New record has been added.', record);

    if (this.history.index && this.history.records.length > this.history.index + 1) {
      this.history.records.splice(this.history.index + 1);
    }

    this.history.records.push(record);
    this.history.index += 1;
  }

  undo() {
    if (!this.graph) return;

    const prevRecord = this.history.getPrevRecord();

    if (!prevRecord) {
      console.warn('[Sa warn]: None previous record in history.');

      return;
    }

    console.log('prev record', prevRecord, this.history);

    if (isURecordDataList(prevRecord.data)) {
      for (const data of prevRecord.data) {
        const element = findNode(this.canvas, node => node.attrs.id === data.id);

        if (element) {
          setObjectValues(element.attrs, data.prev);
          nodeDataChangeHook(this, data.id, data.prev);
        }
      }

      this.setSelected(prevRecord.data.map(data => data.id));
    } else {
      for (const data of prevRecord.data) {
        if (prevRecord.type === BasicRecordType.Add) {
          // DELETE
          removeDrawerNode(this, data.next?.attrs?.id);
        } else if (prevRecord.type === BasicRecordType.Delete) {
          // ADD
          addDrawerNode(this, data.prev);
        }
      }

      if (prevRecord.type === BasicRecordType.Add) {
        this.setSelected(prevRecord.data.map(data => data.next!.attrs.id));
      } else {
        this.setSelected(prevRecord.data.map(data => data.prev!.attrs.id));
      }
    }

    this.history.index -= 1;
  }

  redo() {
    const nextRecord = this.history.getNextRecord();

    if (!nextRecord) {
      console.warn('[Sa warn]: None next record in history.');

      return;
    }

    if (isURecordDataList(nextRecord.data)) {
      for (const data of nextRecord.data) {
        const element = findNode(this.canvas, node => node.attrs.id === data.id);

        if (element) {
          setObjectValues(element.attrs, data.next);
          nodeDataChangeHook(this, data.id, data.next);
        }
      }

      this.setSelected(nextRecord.data.map(data => data.id));
    } else if (isCDRecordDataList(nextRecord.data)) {
      for (const data of nextRecord.data) {
        if (nextRecord.type === BasicRecordType.Add) {
          // ADD
          addDrawerNode(this, data.next);
        } else if (nextRecord.type === BasicRecordType.Delete) {
          // DELETE
          removeDrawerNode(this, data.prev?.attrs?.id);
        }
      }

      if (nextRecord.type === BasicRecordType.Add) {
        this.setSelected(nextRecord.data.map(data => data.next!.attrs.id));
      } else {
        this.setSelected(nextRecord.data.map(data => data.prev!.attrs.id));
      }
    }

    this.history.index += 1;
  }
}

/** update cell or graph after data change */
function nodeDataChangeHook(drawer: PcDrawer, id: string, data: Partial<PcElementAttributes>) {
  if (!drawer.graph) return;

  const cell = drawer.graph.getCellById(id);

  if (cell) {
    const prop = getCellRecProp(cell);

    cell.setProp({
      position: {
        x: data['offsetX'] ?? prop.position.x,
        y: data['offsetY'] ?? prop.position.y
      },
      size: {
        width: data['width'] ?? prop.size.width,
        height: data['height'] ?? prop.size.height
      }
    });
  } else {
    // set canvas data
    drawer.graph.size.resize(
      data['width'] ?? drawer.canvas.attrs.width,
      data['height'] ?? drawer.canvas.attrs.height
    );
  }
}

/** add graph and canvas node */
function addDrawerNode(drawer: PcDrawer, element?: PcElement) {
  if (!drawer.graph || !drawer.canvas.children || !element) return;

  const hasCell = drawer.graph.hasCell(element.attrs.id);

  if (element.parent) {
    if (!hasCell) {
      const x6Node = createPcNode(element);
      drawer.graph.addCell(x6Node);

      // bind x6 cells' paternity
      const x6Parent = drawer.graph.getCellById(element.parent.attrs.id);
      if (x6Parent) {
        x6Parent.addChild(x6Node);
      }
    }

    // bind drawer canvas elements' paternity
    const drawerParent = findNode(drawer.canvas, node => node.attrs.id === element.parent?.attrs.id);
    if (drawerParent) {
      drawerParent.children?.push(element);
      element.parent = drawerParent;
    }
  }
}

/** remove graph and canvas node */
function removeDrawerNode(drawer: PcDrawer, id?: string) {
  if (!drawer.graph || !drawer.canvas.children || !id) return;

  const element = findNode(drawer.canvas, node => node.attrs.id === id);

  if (element && drawer.canvas.children) {
    drawer.graph.removeCell(element.attrs.id);
    removeTreeNode(drawer.canvas.children, node => node.attrs.id === element.attrs.id);
  }
}