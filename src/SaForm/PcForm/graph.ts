import { findTreeNode, setObjectValues } from 'sugar-sajs'
import { cloneDeep, pick } from 'lodash-es'
import {
  BasicRecordType,
  isCDRecordDataList,
  isURecordDataList,
} from '../record'
import { ModifierKey, MoveDirection } from '../graph'
import { PcElement, getNextId, isTab } from './element'
import { PcRecord, PcRecordStore } from './record'

import { PcClipBoard } from './clipboard'
import { Events } from './events'
import { getRectangle } from './layout/workspace/graph/renderer/utils/rectangle'
import { findNode } from './utils/node'
import type { Arrayable } from '@vueuse/core'
import type {
  BasicGraph,
  GraphType,
  Grid,
  Layout,
  MousePosition,
  Scroller,
  Selection,
  Snapline,
} from '../graph'
import type { BasicRecordStore, CDRecord } from '../record'

export type IdUpdateData = { id: string; data: Partial<PcElement['attrs']> }
export type ElUpdateData = {
  element: PcElement
  data: Partial<PcElement['attrs']>
}

function isIdUpdateData(
  data: IdUpdateData | ElUpdateData
): data is IdUpdateData {
  return Reflect.has(data, 'id')
}

export interface SelectionBox {
  x: number
  y: number
  width: number
  height: number
}

export type Stick = 'tl' | 'tm' | 'tr' | 'mr' | 'br' | 'bm' | 'bl' | 'ml'

/** pc graph */
export class PcGraph extends Events implements BasicGraph {
  type: GraphType
  layout: Layout = {
    component: true,
    layer: true,
    property: true,
  }
  canvas: PcElement
  history: BasicRecordStore
  clipboard: PcClipBoard
  selected: PcElement[] = []

  nextId: string
  isDragging = false
  mousePosition = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
  }
  isResizing = false
  resizeStick: Stick | '' = ''
  isSelecting = false
  selectionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }
  selection: Selection = {
    enabled: true,
    modifier: ModifierKey.Ctrl,
    showSelectionBox: true,
  }
  grid: Grid = {
    type: 'double-mesh',
    size: 15,
    enabled: true,
    visible: true,
  }
  snapline: Snapline = {
    radius: 15,
    enabled: true,
  }
  isPanning = false
  scroller: Scroller = {
    pannable: true,
  }

  constructor(config: Partial<PcElement> & { attrs: Record<string, any> }) {
    super()

    this.type = 'PcForm'
    this.history = new PcRecordStore()
    this.clipboard = new PcClipBoard(this)
    this.nextId = '1'
    this.canvas = new PcElement({
      parent: undefined,
      children: [],
      attrs: config.attrs,
    })
    this.addRecord(
      new PcRecord({
        type: BasicRecordType.Init,
        data: [],
      })
    )
  }

  setLayout(layout: Partial<Layout>) {
    setObjectValues(this.layout, layout)
  }
  setSelection(selection: Partial<Selection>) {
    setObjectValues(this.selection, selection)
  }
  setGrid(grid: Partial<Grid>) {
    setObjectValues(this.grid, grid)
  }
  setSnap(snap: Partial<Snapline>) {
    setObjectValues(this.snapline, snap)
  }
  setScroller(scroller: Partial<Scroller>) {
    setObjectValues(this.scroller, scroller)
  }

  setCanvas(canvas: PcElement) {
    this.canvas = canvas
    this.selected = [canvas]

    this.nextId = getNextId(canvas)
  }

  setDragging(isDragging: boolean) {
    this.isDragging = isDragging
  }

  setMouse(pos: Partial<MousePosition> = { x: 0, y: 0, startX: 0, startY: 0 }) {
    setObjectValues(this.mousePosition, pos)
  }

  setResizing(isResizing: boolean) {
    this.isResizing = isResizing
  }

  setResizeStick(stick: Stick | '' = '') {
    this.resizeStick = stick
  }

  setSelecting(isSelecting: boolean) {
    this.isSelecting = isSelecting
  }

  setSelectionBox(
    box: Partial<SelectionBox> = { x: 0, y: 0, width: 0, height: 0 }
  ) {
    setObjectValues(this.selectionBox, box)
  }

  setPanning(isPanning = false) {
    this.isPanning = isPanning
  }

  getNextId() {
    const nextId = this.nextId
    this.nextId = String(Number(nextId) + 1)

    return nextId
  }

  move<A extends Arrayable<string | PcElement>>(
    as: A,
    options: {
      direction: MoveDirection
      distance?: number
    },
    needRecord = true
  ): void {
    const array: (PcElement | string)[] = Array.isArray(as) ? as : [as]
    const targets = array.reduce<PcElement[]>((acc, cur) => {
      if (typeof cur === 'string') {
        const target = findNode(this.canvas, (a) => a.attrs.id === cur)
        return target ? [...acc, target] : acc
      }

      return [...acc, cur]
    }, [])
    const parent = targets[0].parent
    if (!parent) return
    const rect = getRectangle(targets)
    const distance = options.distance ?? this.grid.size
    const direction = options.direction

    // limits the offset of the elements to ensure its always inside the parent.
    const moveX = distance * (direction === MoveDirection.LEFT ? -1 : 1)
    const finalMoveX =
      direction === MoveDirection.LEFT || direction === MoveDirection.RIGHT
        ? moveX + rect.width > parent.attrs.width
          ? parent.attrs.width - rect.width - rect.x
          : rect.x + moveX < 0
          ? -rect.x
          : moveX
        : 0
    const moveY = distance * (direction === MoveDirection.UP ? -1 : 1)
    const finalMoveY =
      direction === MoveDirection.UP || direction === MoveDirection.DOWN
        ? moveY + rect.height > parent.attrs.height
          ? parent.attrs.height - rect.height - rect.y
          : rect.y + moveY < 0
          ? -rect.y
          : moveY
        : 0

    if (finalMoveX || finalMoveY)
      this.updateElemsData(
        targets.map((ele) => {
          return {
            element: ele,
            data: {
              x: ele.attrs.x + finalMoveX,
              y: ele.attrs.y + finalMoveY,
            },
          }
        }),
        needRecord
      )
  }

  /** add child and return its parent */
  addChild(
    child: CDRecord<PcElement>,
    parent?: PcElement,
    needRecord?: boolean
  ): PcElement
  addChild(
    child: CDRecord<PcElement>,
    parent?: string,
    needRecord?: boolean
  ): PcElement
  addChild(
    child: CDRecord<PcElement>,
    arg?: string | PcElement,
    needRecord = true
  ): PcElement | undefined {
    const parent =
      (typeof arg === 'string'
        ? findNode(this.canvas, (node) => node.attrs.id === arg)
        : arg) ?? this.canvas

    const createdChild = addGraphElement(this, child)
    if (!createdChild) return

    // TODO:
    const validIntegerRegex = /^-?\d+$/
    if (child.attrs.id && validIntegerRegex.test(child.attrs.id)) {
      if (+this.nextId < +child.attrs.id) {
        this.nextId = `${+child.attrs.id + 1}`
      }
    }

    if (needRecord) {
      const record = new PcRecord({
        type: BasicRecordType.Add,
        data: [
          {
            name: child.attrs.name,
            next: {
              ...cloneDeep(extractGraphNodePureAttr(child)),
            },
          },
        ],
      })
      this.addRecord(record)
    }
    this.setSelected(createdChild)

    return parent
  }

  /** add children and return their parent */
  addChildren(
    children: CDRecord<PcElement>[],
    parent?: PcElement,
    needRecord?: boolean
  ): PcElement
  addChildren(
    children: CDRecord<PcElement>[],
    parent?: string,
    needRecord?: boolean
  ): PcElement
  addChildren(
    children: CDRecord<PcElement>[],
    arg?: string | PcElement,
    needRecord = true
  ): PcElement {
    const parent =
      (typeof arg === 'string'
        ? findNode(this.canvas, (node) => node.attrs.id === arg)
        : arg) ?? this.canvas

    const added = children.reduce<PcElement[]>((acc, cur) => {
      const node = addGraphElement(this, cur)
      return node ? [...acc, node] : acc
    }, [])

    if (needRecord) {
      const record = new PcRecord({
        type: BasicRecordType.Add,
        data: children.map((child) => ({
          name: child.attrs.name,
          next: {
            ...cloneDeep(child),
          },
        })),
      })
      this.addRecord(record)
    }
    this.setSelected(added)

    return parent
  }

  /** remove elements(s)  */
  remove<A extends Arrayable<PcElement | string>>(
    as: A,
    needRecord = true
  ): void {
    const children: (PcElement | string)[] = Array.isArray(as) ? as : [as]

    const removedChildren = children.reduce<PcElement[]>((acc, cur) => {
      const removed = removeGraphElement(
        this,
        typeof cur === 'string' ? cur : cur.attrs.id
      )
      return removed ? [...acc, removed] : acc
    }, [])

    if (needRecord) {
      const record = new PcRecord({
        type: BasicRecordType.Delete,
        data: removedChildren.map((a) => ({
          name: a.attrs.name,
          prev: cloneDeep(extractGraphNodePureAttr(a)),
        })),
      })
      this.addRecord(record)
    }
    this.setSelected()
  }

  scrollIntoView(
    // TODO: multi elements
    element: PcElement | undefined,
    options: ScrollIntoViewOptions = {
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    }
  ) {
    if (!element || element === this.canvas) return

    let current = element
    while (current.parent) {
      const parent = current.parent
      if (isTab(parent))
        parent.attrs['tab-index'] = parent.tabs.findIndex((pane) =>
          pane.children.includes(current)
        )

      current = current.parent
    }

    element.el?.scrollIntoView(options)
  }

  setSelected(): PcElement | undefined
  setSelected(id: string): PcElement | undefined
  setSelected(ids: string[]): PcElement[]
  setSelected(element: PcElement): PcElement
  setSelected(elements: PcElement[]): PcElement[]
  setSelected(arg?: string | string[] | PcElement | PcElement[]) {
    if (!arguments.length || (Array.isArray(arg) && !arg.length)) {
      this.selected = [this.canvas]

      return this.canvas
    }

    if (!this.canvas.children) return

    if (Array.isArray(arg)) {
      const selected = arg.reduce<PcElement[]>((acc, cur) => {
        if (typeof cur === 'string') {
          const node = findNode(this.canvas, (node) => node.attrs.id === cur)
          if (node) return [...acc, node]
          return acc
        } else {
          return [...acc, cur]
        }
      }, [])
      if (!selected.length) return (this.selected = [this.canvas])

      this.selected = selected

      return selected
    }

    if (typeof arg === 'string') {
      const node = findNode(this.canvas, (node) => node.attrs.id === arg)

      if (node) {
        this.selected = [node]
      }

      return node
    }

    if (typeof arg === 'object') {
      this.selected = [arg]

      return arg
    }
  }

  updateElemData(
    id: string,
    data: Partial<PcElement['attrs']>,
    needRecord?: boolean
  ): PcElement | undefined
  updateElemData(
    element: PcElement,
    data: Partial<PcElement['attrs']>,
    needRecord?: boolean
  ): PcElement | undefined
  updateElemData(
    arg: string | PcElement,
    data: Partial<PcElement['attrs']>,
    needRecord = true
  ) {
    if (!arg) return

    const element =
      typeof arg === 'string'
        ? findNode(this.canvas, (node) => node.attrs.id === arg)
        : arg

    if (!element) return undefined

    if (needRecord) {
      const record = new PcRecord({
        type: BasicRecordType.Attr,
        data: [
          {
            id: element.attrs.id,
            name: element.attrs.name,
            prev: cloneDeep(pick(element.attrs, Object.keys(data))),
            next: cloneDeep(data),
          },
        ],
      })

      this.addRecord(record)
    }

    setObjectValues(element.attrs, data)

    return element
  }

  updateElemsData(
    data: IdUpdateData[],
    needRecord?: boolean
  ): PcElement[] | undefined
  updateElemsData(
    data: ElUpdateData[],
    needRecord?: boolean
  ): PcElement[] | undefined
  updateElemsData(arg: IdUpdateData[] | ElUpdateData[], needRecord = true) {
    const batch = arg.map((data) => ({
      el: isIdUpdateData(data)
        ? findNode(this.canvas, (node) => node.attrs.id === data.id)!
        : data.element,
      data: data.data,
    }))

    if (needRecord) {
      const record = new PcRecord({
        type: BasicRecordType.Attr,
        data: batch.map((u) => ({
          id: u.el.attrs.id,
          name: u.el.attrs.name,
          prev: cloneDeep(pick(u.el.attrs, Object.keys(u.data))),
          next: cloneDeep(u.data),
        })),
      })

      this.addRecord(record)
    }

    for (const update of batch) {
      this.updateElemData(update.el, update.data, false)
    }

    return batch.map((u) => u.el)
  }

  /** add history record */
  addRecord(record: PcRecord) {
    console.log('[Sa info]: New record has been added.', record)

    if (
      this.history.index &&
      this.history.records.length > this.history.index + 1
    ) {
      this.history.records.splice(this.history.index + 1)
    }

    this.history.records.push(record)
    this.history.index += 1
  }

  undo() {
    const prevRecord = this.history.getPrevRecord()

    if (!prevRecord || prevRecord.type === BasicRecordType.Init) {
      console.warn('[Sa warn]: None previous record in history.')

      return
    }

    if (isURecordDataList(prevRecord.data)) {
      for (const data of prevRecord.data) {
        const element = findNode(
          this.canvas,
          (node) => node.attrs.id === data.id
        )

        if (element) {
          setObjectValues(element.attrs, data.prev)
        }
      }

      this.setSelected(prevRecord.data.map((data) => data.id))
    } else {
      for (const data of prevRecord.data) {
        if (prevRecord.type === BasicRecordType.Add) {
          // DELETE
          removeGraphElement(this, data.next)
        } else if (prevRecord.type === BasicRecordType.Delete) {
          // ADD
          addGraphElement(this, data.prev)
        }
      }

      if (prevRecord.type === BasicRecordType.Add) {
        this.setSelected(prevRecord.data.map((data) => data.next!.attrs.id))
      } else {
        this.setSelected(prevRecord.data.map((data) => data.prev!.attrs.id))
      }
    }

    this.scrollIntoView(this.selected[0])
    this.history.index -= 1
  }

  redo() {
    const nextRecord = this.history.getNextRecord()

    if (!nextRecord) {
      console.warn('[Sa warn]: None next record in history.')

      return
    }

    if (isURecordDataList(nextRecord.data)) {
      for (const data of nextRecord.data) {
        const element = findNode(
          this.canvas,
          (node) => node.attrs.id === data.id
        )

        if (element) {
          setObjectValues(element.attrs, data.next)
        }
      }

      this.setSelected(nextRecord.data.map((data) => data.id))
    } else if (isCDRecordDataList(nextRecord.data)) {
      for (const data of nextRecord.data) {
        if (nextRecord.type === BasicRecordType.Add) {
          // ADD
          addGraphElement(this, data.next)
        } else if (nextRecord.type === BasicRecordType.Delete) {
          // DELETE
          removeGraphElement(this, data.prev)
        }
      }

      if (nextRecord.type === BasicRecordType.Add) {
        this.setSelected(nextRecord.data.map((data) => data.next!.attrs.id))
      } else {
        this.setSelected(nextRecord.data.map((data) => data.prev!.attrs.id))
      }
    }

    this.scrollIntoView(this.selected[0])
    this.history.index += 1
  }

  historyTo(to: number): void
  historyTo(to: PcRecord): void
  historyTo(to: number | PcRecord) {
    if (typeof to !== 'number') to = this.history.records.indexOf(to)

    const index = this.history.index
    if (to === index || to > this.history.records.length || to < 0) return

    const distance = Math.abs(to - index)
    const action = to < index ? this.undo : this.redo
    for (let i = 0; i < distance; i++) {
      action.call(this)
    }
  }
}

const extractGraphNodePureAttr = (element: CDRecord<PcElement>) => {
  const parent = element.parent
    ? {
        attrs: {
          id: element.parent.attrs.id,
          type: element.parent.attrs.type,
          'tab-index': element.parent.attrs['tab-index'],
        },
      }
    : undefined

  return {
    parent,
    // TODO: extract children in deep
    children: element.children,
    attrs: element.attrs,
  } as PcElement
}

/** add canvas element */
const addGraphElement = (
  graph: PcGraph,
  element?: CDRecord<PcElement>
): PcElement | undefined => {
  if (!graph.canvas.children || !element) return

  const pid = element.parent?.attrs.id
  if (!pid) return

  const parent = findNode(graph.canvas, (node) => node.attrs.id === pid)

  if (parent) {
    const pcElement = new PcElement(element)
    if (isTab(parent)) {
      const pane =
        parent.tabs[
          element.parent?.attrs['tab-index'] ?? parent.attrs['tab-index']
        ]
      pane.children.push(pcElement)
    } else {
      parent.children?.push(pcElement)
    }
    pcElement.parent = parent

    return pcElement
  }
}
/** remove canvas element */
const removeGraphElement = (
  graph: PcGraph,
  arg?: CDRecord<PcElement> | string
): PcElement | undefined => {
  const id = typeof arg === 'string' ? arg : arg?.attrs.id
  if (!graph.canvas.children?.length || !id) return

  const finded = findNode(graph.canvas, (node) => node.attrs.id === id)
  if (!finded) return

  const pid = finded.parent?.attrs.id
  if (!pid) return

  const parent = findNode(graph.canvas, (node) => node.attrs.id === pid)
  if (!parent) return

  if (isTab(parent)) {
    const tabIndex = parent.tabs.findIndex((tab) =>
      tab.children.some((a) => a.attrs.id === id)
    ) // TODO: Waiting for optimization. Reduce the number of iterations.
    const pane = parent.tabs[tabIndex]
    pane.children.splice(pane.children.indexOf(finded), 1)
  } else if (parent.children) {
    parent.children.splice(parent.children.indexOf(finded), 1)
  }

  return finded
}
