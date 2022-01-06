import { BasicElement, BasicElementAttributes } from '../element';

export interface PcElementAttributes extends BasicElementAttributes {

}

export interface IPcElement extends BasicElement {

}

export class PcElement implements IPcElement {
  [key: string | number]: any;
  parent: PcElement | undefined;
  children?: PcElement[];
  attrs: PcElementAttributes;

  constructor(config: IPcElement) {
    this.parent = config.parent;
    this.attrs = config.attrs;
    if (config.children) this.children = config.children;
  }
}