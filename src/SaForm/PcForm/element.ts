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

const S4 = () =>
  Math.trunc((1 + Math.random()) * 0x10000)
    .toString(16)
    .slice(1)

export class PcElement implements BasicElement {
  [k: string]: any
  key: string = S4()
  parent?: PcElement
  children?: PcElement[]
  attrs: PcElementAttributes

  constructor(config: Omit<PcElement, 'key'>) {
    this.parent = config.parent
    this.attrs = cloneDeep(config.attrs)
    if (config.children) this.children = config.children
  }
}
