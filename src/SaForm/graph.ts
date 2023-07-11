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

export interface Position {
  x: number
  y: number
}
export interface MousePosition extends Position {
  startX: number
  startY: number
}

export type Grid = {
  type: 'dot' | 'mesh' | 'double-mesh'
  size: number
  enabled: boolean
  visible: true
}
export type Snapline = {
  radius: number
  enabled: boolean
}
export enum ModifierKey {
  Ctrl = 'ctrl',
  Alt = 'alt',
  Shift = 'shift',
}
export type Selection = {
  enabled: boolean
  modifier: ModifierKey
  showSelectionBox: boolean
}
export type Scroller = {
  pannable: boolean
}
export type Layout = {
  component: boolean
  layer: boolean
  property: boolean
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
  scroller: Scroller
  setLayout: (layout: Partial<Layout>) => void
  setSelection: (selection: Partial<Selection>) => void
  setGrid: (grid: Partial<Grid>) => void
  setSnap: (snap: Partial<Snapline>) => void
  setScroller: (scroller: Partial<Scroller>) => void

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
