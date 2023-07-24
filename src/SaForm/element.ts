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
  Calendar,
  Contextmenu,
  Tree,
  Map,
  Chart,
}

/** basic element attributes */
export interface BasicElementAttributes {
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
  /** border style */
  'border-style'?: CSSProperties['borderStyle']
  /** border width */
  'border-width'?: number
  /** border color */
  'border-color'?: CSSProperties['borderColor']
  /** font size `px` */
  'font-size'?: number
  /** font family */
  'font-family'?: CSSProperties['fontFamily']
  /** font color */
  'font-color'?: CSSProperties['color']
}

/** basic element */
export interface BasicElement {
  key: string
  el?: HTMLElement
  parent?: BasicElement
  children?: BasicElement[]
  attrs: BasicElementAttributes

  setEl: (el?: HTMLElement) => void
}
