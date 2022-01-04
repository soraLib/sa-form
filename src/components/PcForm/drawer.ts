import { Graph } from '@antv/x6';
import { BasicDrawer, DrawerType } from '../drawer';
import { BasicElement, ElementType } from '../element';
import { BasicRecordStore, BasicRecord } from '../record';
import { PcElement } from './element';
import { PcRecordStore } from './record';

import { findTreeNode } from 'sugar-sajs';

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

  setSelected(id: string): PcElement | undefined;
  setSelected(ids: string[]): PcElement[];
  setSelected(element: PcElement): PcElement;
  setSelected(elements: PcElement[]): PcElement[];
  setSelected(arg: string | string[] | PcElement | PcElement[]) {
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

  // updateNodeAttr(id: string, key: string, ): PcElement;
}