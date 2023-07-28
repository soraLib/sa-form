import type { CSSProperties } from 'vue'

/** element types */ // TODO: split pc types
export enum ElementType {
  Canvas = 1,
  Container,
  Text,
  Input,
  Textarea,
  Button,
  Radio,
  Checkbox,
  Select,
  Table,
  Image,
  Tab,
  TabPane,
  TimePicker,
  Contextmenu,
  Tree,
  Map,
  Chart,
}

export type ElementBorderAttributes = {
  /** border style */
  'border-style'?: CSSProperties['borderStyle']
  /** border width */
  'border-width'?: number
  /** border color */
  'border-color'?: CSSProperties['borderColor']
  /** border radius */
  'border-radius'?: number
}
export type ElementFontAttributes = {
  /** font size `px` */
  'font-size'?: number
  /** font family */
  'font-family'?: CSSProperties['fontFamily']
  /** font color */
  'font-color'?: CSSProperties['color']
  /** font decoration */
  'font-decoration'?: 'none' | 'underline' | 'line-through' | 'overline'
  /** font style */
  'font-style'?: 'normal' | 'italic' | 'bold' | 'bold-italic'
}
export type ElementAlignAttributes = {
  'align-horizontal'?: CSSProperties['justify-content']
  'align-vertical'?: CSSProperties['align-items']
}
/** basic element attributes */
export type BasicElementAttributes = {
  /** element type */
  type: ElementType
  /** unique id */
  id: string
  /** unique name */
  name: string
  /** offset X to parent element */
  x: number
  /** offset Y to parent element */
  y: number
  /** width `px` */
  width: number
  /** height `px` */
  height: number
  /** background */
  background?: CSSProperties['background']
  /** display name */
  display?: string
} & ElementBorderAttributes &
  ElementFontAttributes &
  ElementAlignAttributes

/** basic element */
export interface BasicElement {
  el?: HTMLElement
  parent?: BasicElement
  children?: BasicElement[]
  attrs: BasicElementAttributes

  setEl: (el?: HTMLElement) => void
}
