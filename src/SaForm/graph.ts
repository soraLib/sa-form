import { BasicElement } from './element'
import { BasicRecordStore, BasicRecord } from './record'

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
  /** is dragging tag */
  isDrag: boolean
  /** mouse position */
  mousePosition: MousePosition

  getNextId(): string
  updateElemData(id: string, data: Partial<BasicElement['attrs']>, needRecord?: boolean): BasicElement | undefined
  updateElemData(element: BasicElement, data: Partial<BasicElement['attrs']>, needRecord?: boolean): BasicElement | undefined
  historyTo(to: number): void
  historyTo(to: BasicRecord): void
}
