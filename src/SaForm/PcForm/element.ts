import { cloneDeep } from 'lodash-es'
import { ElementType } from '../element'
import type { SelectOption } from './plugins/select'
import type { BasicElement, BasicElementAttributes } from '../element'

export interface PcSelectAttributes {
  /** select options */
  options?: SelectOption[]
}

export type PcElementAttributes = BasicElementAttributes & PcSelectAttributes

export function isPcElementAttribute(
  attr: string,
  elem: PcElement
): attr is keyof PcElementAttributes {
  return Reflect.has(elem.attrs, attr)
}

export const containerElements = [ElementType.Canvas, ElementType.Container]

export class PcElement implements BasicElement {
  [key: string | number]: any
  parent?: PcElement
  children?: PcElement[]
  attrs: PcElementAttributes

  constructor(config: PcElement) {
    this.parent = config.parent
    this.attrs = cloneDeep(config.attrs)
    if (config.children) this.children = config.children
  }
}
