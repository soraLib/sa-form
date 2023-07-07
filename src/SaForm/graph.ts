import type { BasicElement } from './element'
import type { BasicRecord, BasicRecordStore } from './record'

export type GraphType =
  /** pc form */
  'PcForm'
/** app form */
// 'AppForm' |
/** flow form */
// 'Flow' |
/** print form */
// 'Print'

export interface MousePosition {
  startX: number
  startY: number
  x: number
  y: number
}

export type Grid = {
  type: 'dot' | 'mesh'
  size: number
  enabled: boolean
}
export type Snapline = {
  threshold: number
  enabled: boolean
}
export type Layout = {
  layer: boolean
}
/** basic graph */
export interface BasicGraph {
  /** graph type */
  type: GraphType
  /** graph canvas, contain all elements here */
  canvas: BasicElement
  /** record store */
  history: BasicRecordStore
  /** current selected elements */
  selected: BasicElement[]
  /** div container */
  containter?: HTMLDivElement
  grid: Grid
  snapline: Snapline
  layout: Layout
  setLayout: (layout: Partial<Layout>) => void
  getNextId(): string

  scrollIntoView(
    element: BasicElement | undefined,
    options?: ScrollIntoViewOptions
  ): void

  setSelected(): BasicElement | undefined
  setSelected(id: string): BasicElement | undefined
  setSelected(ids: string[]): BasicElement[]
  setSelected(element: BasicElement): BasicElement
  setSelected(elements: BasicElement[]): BasicElement[]

  updateElemData(
    id: string,
    data: Partial<BasicElement['attrs']>,
    needRecord?: boolean
  ): BasicElement | undefined
  updateElemData(
    element: BasicElement,
    data: Partial<BasicElement['attrs']>,
    needRecord?: boolean
  ): BasicElement | undefined
  historyTo(to: number): void
  historyTo(to: BasicRecord): void
}
