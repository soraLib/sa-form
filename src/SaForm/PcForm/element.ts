import { cloneDeep } from 'lodash-es'
import { ElementType } from '../element'
import type { SelectOption } from './plugins/select'
import type { BasicElement, BasicElementAttributes } from '../element'

export type PcSelectAttributes = {
  /** select options */
  options?: SelectOption[]
}
export type PcRadioAttributes = {
  'row-number': number
  'column-number': number
}

export type PcElementAttributes = BasicElementAttributes &
  PcSelectAttributes &
  PcRadioAttributes

export function isPcElementAttribute(
  attr: string,
  elem: PcElement
): attr is keyof PcElementAttributes {
  return Reflect.has(elem.attrs, attr)
}

export const containerElements = [
  ElementType.Canvas,
  ElementType.Container,
  ElementType.Tab,
]
export const isContainerType = (type: ElementType) =>
  containerElements.includes(type)
export const isContainer = (element: PcElement) =>
  isContainerType(element.attrs.type)

/** pc element */
export interface IPcElement extends BasicElement {
  children?: IPcElement[]
  attrs: PcElementAttributes
}

export class PcElement implements IPcElement {
  key: string
  el?: HTMLElement
  parent?: PcElement
  children?: PcElement[]
  attrs: PcElementAttributes

  constructor(config: Pick<IPcElement, 'parent' | 'children' | 'attrs'>) {
    this.parent = config.parent
    this.attrs = cloneDeep(config.attrs)
    this.key = config.attrs.id
    if (config.children || isContainerType(config.attrs.type))
      this.children = config.children ?? []
  }

  setEl(el?: HTMLElement) {
    this.el = el
  }
}
