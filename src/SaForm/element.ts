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
  /** element width `px` */
  width: number
  /** element height `px` */
  height: number
  /** element background */
  background?: CSSProperties['background']
  /** element display name */
  display?: string
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
