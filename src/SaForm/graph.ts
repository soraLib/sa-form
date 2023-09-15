import type { Arrayable } from '@vueuse/core'
import type { BasicClipBoard } from './clipboard'
import type { BasicElement } from './element'
import type { BasicRecord, BasicRecordStore } from './record'
import type { ScaleType } from '@/components/AutoScale'

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

export enum MoveDirection {
  UP = 'up',
  DOWN = 'down',
  RIGHT = 'right',
  LEFT = 'left',
}

export type ScaleOption = {
  type: ScaleType
  ratio: number
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
  isDraft: boolean
  grid: Grid
  snapline: Snapline
  scroller: Scroller
  clipboard: BasicClipBoard

  scale: ScaleOption
  setScale: (optons: Partial<ScaleOption>) => void

  setSelection: (selection: Partial<Selection>) => void
  setGrid: (grid: Partial<Grid>) => void
  setSnap: (snap: Partial<Snapline>) => void
  setScroller: (scroller: Partial<Scroller>) => void
  setIsDraft: (isDraft?: boolean) => void

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

  move<A extends Arrayable<string | BasicElement>>(
    as: A,
    options: {
      direction: MoveDirection
      distance?: number
    },
    needRecord?: boolean
  ): void
  remove<A extends Arrayable<string | BasicElement>>(
    as: A,
    needRecord?: boolean
  ): void

  undo(): void
  redo(): void
}
