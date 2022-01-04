import { Graph } from '@antv/x6';
import { BasicDrawer, DrawerType } from '../drawer';
import { BasicElement, ElementType } from '../element';
import { BasicRecordStore, BasicRecord } from '../record';
import { PcElement, PcElementAttributes } from './element';
import { PcRecordStore } from './record';

import { findNode, findTreeNode } from 'sugar-sajs';

/** pc drawer */
export class PcDrawer implements BasicDrawer {
  type: DrawerType;
  canvas: PcElement;
  record: BasicRecordStore;
  selected: BasicElement[] = [];
  graph: Graph | undefined;

  constructor(config: Partial<PcElement> & {attrs: {}}) {
    this.type = 'PcForm';
    this.record = new PcRecordStore();
    this.canvas = new PcElement({
      parent: undefined,
      children: [],
      attrs: config.attrs
    });
  }

  setCanvas(canvas: PcElement) {
    this.canvas = canvas;
    this.selected = [canvas];
  }

  setGraph(graph: Graph) {
    this.graph = graph;
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
    if (!arguments.length || (Array.isArray(arg) && !arg.length)) {
      this.selected = [this.canvas];

      return this.canvas;
    }

    if (!this.canvas.children) return;

    if (typeof arg === 'string') {
      const node = findTreeNode(this.canvas.children, node => node.attrs.id === arg);
      if (node) this.selected = [node];

      return node;
    }

    if (Array.isArray(arg)) {
      const selected: PcElement[] = [];

      for (const item of arg) {
        if (typeof item === 'string') {
          const node = findTreeNode(this.canvas.children, node => node.attrs.id === item);
          if (node) selected.push(node);
        } else {
          selected.push(item);
        }
      }

      this.selected = selected;

      return selected;
    }

    if (typeof arg === 'object') {
      this.selected = [arg];

      return arg;
    }
  }

  /** update pc element attribute value */
  updateElemAttr<T extends keyof PcElementAttributes>(id: string, key: T, value: PcElementAttributes[T]): PcElement | undefined;
  updateElemAttr<T extends keyof PcElementAttributes>(element: PcElement, key: T, value: PcElementAttributes[T]): PcElement;
  updateElemAttr<T extends keyof PcElementAttributes>(arg: PcElement | string, key: T, value: PcElementAttributes[T]): PcElement | undefined {
    const element = typeof arg === 'string' ? findNode(this.canvas, node => node.attrs.id === arg) : arg;
    if (!element) return undefined;

    element.attrs[key] = value;

    // TODO: value change hook

    return element;
  }

  updateElemData(id: string, data: PcElement['attrs']): PcElement | undefined;
  updateElemData(element: PcElement, data: PcElement['attrs']): PcElement | undefined;
  updateElemData(arg: string | PcElement, data: PcElement['attrs']) {
    const element = typeof arg === 'string' ? findNode(this.canvas, node => node.attrs.id === arg) : arg;

    if (!element) return undefined;

    element.attrs = data;

    return element;
  }
}