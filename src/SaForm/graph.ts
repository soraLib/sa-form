import type { Arrayable } from '@vueuse/core'
import type { BasicClipBoard } from './clipboard'
import type { BasicElement } from './element'
import type { BasicRecord, BasicRecordStore } from './record'
import type { ScaleType } from '@/components/AutoScale'

export enum GraphType {
  Pc = 'PcForm',
  // App = 'AppForm',
  // Flow = 'FlowForm',
  // Print = 'PrintForm',
}

export interface Position {
  x: number
  y: number
}
export interface MousePosition extends Position {
  startX: number
  startY: number
}

export type GridSetting = {
  type: 'dot' | 'mesh' | 'double-mesh'
  size: number
  enabled: boolean
  visible: true
}
export type SnaplineSetting = {
  radius: number
  enabled: boolean
}
export enum ModifierKey {
  Ctrl = 'ctrl',
  Alt = 'alt',
  Shift = 'shift',
}
export type SelectionSetting = {
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

export type ScaleSetting = {
  type: ScaleType
  ratio: number
}

export type IdUpdateData<T extends BasicElement = BasicElement> = {
  id: string
  data: Partial<T['attrs']>
}
export type ElUpdateData<T extends BasicElement = BasicElement> = {
  element: BasicElement
  data: Partial<T['attrs']>
}
export function isIdUpdateData<T extends BasicElement = BasicElement>(
  data: IdUpdateData<T> | ElUpdateData<T>
): data is IdUpdateData<T> {
  return Reflect.has(data, 'id')
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

  scale: ScaleSetting
  setScale: (optons: Partial<ScaleSetting>) => void

  selection: SelectionSetting

  isDraft: boolean
  grid: GridSetting
  snapline: SnaplineSetting
  scroller: Scroller
  clipboard: BasicClipBoard
  setSelection: (selection: Partial<SelectionSetting>) => void
  setGrid: (grid: Partial<GridSetting>) => void
  setSnap: (snap: Partial<SnaplineSetting>) => void
  setScroller: (scroller: Partial<Scroller>) => void
  setIsDraft: (isDraft?: boolean) => void
  setDevice?: (type: GraphType) => void

  setCanvas(canvas: BasicElement): void

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

  updateElemsData(
    data: IdUpdateData[],
    needRecord?: boolean
  ): BasicElement[] | undefined
  updateElemsData(
    data: ElUpdateData[],
    needRecord?: boolean
  ): BasicElement[] | undefined

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
  save(): Promise<void>
}
