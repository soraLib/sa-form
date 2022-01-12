import { cloneDeep } from 'lodash-es';
import { BasicElement, BasicElementAttributes } from '../element';

export interface PcSelectAttributes {
  /** select options */
  options?: { name: string }[];
}

export interface PcElementAttributes extends BasicElementAttributes {

}

export interface IPcElement extends BasicElement {

}

export class PcElement implements IPcElement {
  [key: string | number]: any;
  parent: PcElement | undefined;
  children?: PcElement[];
  attrs: PcElementAttributes & PcSelectAttributes;

  constructor(config: IPcElement) {
    this.parent = config.parent;
    this.attrs = cloneDeep(config.attrs);
    if (config.children) this.children = config.children;
  }
}