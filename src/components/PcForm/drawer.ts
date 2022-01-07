import { Cell, Graph } from '@antv/x6';
import { BasicDrawer, DrawerType } from '../drawer';
import { BasicElement } from '../element';
import { BasicRecordStore, BasicRecordType } from '../record';
import { PcElement, PcElementAttributes } from './element';
import { PcRecord, PcRecordStore } from './record';

import { findNode, findTreeNode, setObjectValues } from 'sugar-sajs';
import { cloneDeep, pick } from 'lodash-es';
import { getCellRecProp } from './layout/workspace/utils';
import { getNextId, setGraphSelected } from '../utils/element';
import { PcClipBoard } from './clipboard';

export const NEED_UPDATE_GRAPH_PROPERTIES: (keyof PcElementAttributes)[] = ['offsetX', 'offsetY', 'width', 'height'];

/** pc drawer */
export class PcDrawer implements BasicDrawer {
  type: DrawerType;
  canvas: PcElement;
  history: BasicRecordStore;
  clipboard: PcClipBoard;
  selected: BasicElement[] = [];
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

    if (parent.children) {
      parent.children.push(child);
    }

    return parent;
  }

  setSelected(): PcElement | undefined;
  setSelected(id: string): PcElement | undefined;
  setSelected(ids: string[]): PcElement[];
  setSelected(element: PcElement): PcElement;
  setSelected(elements: PcElement[]): PcElement[];
  setSelected(arg?: string | string[] | PcElement | PcElement[]) {
    if(!this.graph) return;

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

  updateElemData(id: string, data: Partial<PcElement['attrs']>): PcElement | undefined;
  updateElemData(element: PcElement, data: Partial<PcElement['attrs']>): PcElement | undefined;
  updateElemData(arg: string | PcElement, data: Partial<PcElement['attrs']>) {
    const element = typeof arg === 'string' ? findNode(this.canvas, node => node.attrs.id === arg) : arg;

    if (!element) return undefined;

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
    nodeDataChangeHook(this, element.attrs.id, data);

    setObjectValues(element.attrs, data);

    return element;
  }

  /** add history record */
  addRecord(record: PcRecord) {
    console.log('[Sa info]: New record has been added.', record);

    if(this.history.index && this.history.records.length > this.history.index + 1) {
      this.history.records.splice(this.history.index + 1);
    }

    this.history.records.push(record);
    this.history.index += 1;
  }

  undo() {
    const prevRecord = this.history.getPrevRecord();

    if(!prevRecord) {
      console.warn('[Sa warn]: None previous record in history.');

      return;
    }

    // TODO: ADD, DELETE, MOVE
    for(const data of prevRecord.data) {
      const element = findNode(this.canvas, node => node.attrs.id === data.id);
        
      if(element) {
        setObjectValues(element.attrs, data.prev);
        nodeDataChangeHook(this, data.id, data.prev);
      }
    }

    this.setSelected(prevRecord.data.map(data => data.id));

    this.history.index -= 1;
  }

  redo() {
    const nextRecord = this.history.getNextRecord();

    if(!nextRecord) {
      console.warn('[Sa warn]: None next record in history.')

      return;
    }

    // TODO: ADD, DELETE, MOVE
    for(const data of nextRecord.data) {
      const element = findNode(this.canvas, node => node.attrs.id === data.id);
        
      if(element) {
        setObjectValues(element.attrs, data.next);
        nodeDataChangeHook(this, data.id, data.next);
      }
    }

    this.setSelected(nextRecord.data.map(data => data.id));

    this.history.index += 1;
  }
}

function nodeDataChangeHook(drawer: PcDrawer, id: string, data: Partial<PcElementAttributes>) {
  if(!drawer.graph) return;

  const cell = drawer.graph.getCellById(id);

  console.log('nodeDataChangeHook', cell, id);

  if(cell) {
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