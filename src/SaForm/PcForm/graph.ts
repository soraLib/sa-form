import {
  findNode,
  findTreeNode,
  removeTreeNode,
  setObjectValues,
} from 'sugar-sajs'
import { cloneDeep, pick } from 'lodash-es'
import {
  BasicRecordType,
  isCDRecordDataList,
  isURecordData,
  isURecordDataList,
} from '../record'
import { getNextId } from '../utils/element'
import { PcElement } from './element'
import { PcRecord, PcRecordStore } from './record'

import { PcClipBoard } from './clipboard'
import { Events } from './events'
import type { BasicGraph, GraphType, Layout, MousePosition } from '../graph'
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
    layer: true,
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
  isSelect = false
  selectionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }
  grid = {
    // TODO:
    type: 'mesh',
    size: 15,
    enabled: true,
  } as const
  snapline = {
    // TODO:
    threshold: 15,
    enabled: true,
  }

  constructor(config: Partial<PcElement> & { attrs: Record<string, any> }) {
    super()

    this.type = 'PcForm'
    this.history = new PcRecordStore()
    this.clipboard = new PcClipBoard()
    this.nextId = '1'
    this.canvas = new PcElement({
      parent: undefined,
      children: [],
      attrs: config.attrs,
    })
    this.addRecord(
      new PcRecord({
        type: BasicRecordType.Init,
        time: new Date(),
        data: [],
      })
    )
  }

  setLayout(layout: Partial<Layout>) {
    for (const [key, value] of Object.entries(layout)) {
      this.layout[key as keyof Layout] = value
    }
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

  setSelect(isSelect: boolean) {
    this.isSelect = isSelect
  }

  setSelectionBox(
    box: Partial<SelectionBox> = { x: 0, y: 0, width: 0, height: 0 }
  ) {
    setObjectValues(this.selectionBox, box)
  }

  getNextId() {
    const nextId = this.nextId
    this.nextId = String(Number(nextId) + 1)

    return nextId
  }

  /** add child and return its parent */
  addChild(child: PcElement, parent?: PcElement): PcElement
  addChild(child: PcElement, parent?: string): PcElement
  addChild(child: PcElement, arg?: string | PcElement): PcElement {
    const parent =
      (typeof arg === 'string'
        ? findTreeNode(this.canvas.children!, (node) => node.attrs.id === arg)
        : arg) ?? this.canvas

    addGraphNode(this, child)

    // skip add record when it's undo or redo
    const record = new PcRecord({
      type: BasicRecordType.Add,
      time: new Date(),
      data: [
        {
          name: child.attrs.name,
          next: {
            ...cloneDeep(child),
          },
        },
      ],
    })

    this.addRecord(record)
    this.setSelected(child)

    return parent
  }

  /** add children and return their parent */
  addChildren(children: PcElement[], parent?: PcElement): PcElement
  addChildren(children: PcElement[], parent?: string): PcElement
  addChildren(children: PcElement[], arg?: string | PcElement): PcElement {
    const parent =
      (typeof arg === 'string'
        ? findTreeNode(this.canvas.children!, (node) => node.attrs.id === arg)
        : arg) ?? this.canvas

    for (const child of children) {
      addGraphNode(this, child)
    }

    // skip add record when it's undo or redo
    const record = new PcRecord({
      type: BasicRecordType.Add,
      time: new Date(),
      data: children.map((child) => ({
        name: child.attrs.name,
        next: {
          ...cloneDeep(child),
        },
      })),
    })

    this.addRecord(record)
    this.setSelected(children)

    return parent
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
      selected[0]?.el?.scrollIntoView({ behavior: 'smooth' })

      return selected
    }

    if (typeof arg === 'string') {
      const node = findNode(this.canvas, (node) => node.attrs.id === arg)

      if (node) {
        this.selected = [node]
        node.el?.scrollIntoView({ behavior: 'smooth' })
      }

      return node
    }

    if (typeof arg === 'object') {
      this.selected = [arg]
      arg.el?.scrollIntoView({ behavior: 'smooth' })

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
        time: new Date(),
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
        time: new Date(),
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
          removeGraphNode(this, data.next?.attrs?.id)
        } else if (prevRecord.type === BasicRecordType.Delete) {
          // ADD
          addGraphNode(this, data.prev)
        }
      }

      if (prevRecord.type === BasicRecordType.Add) {
        this.setSelected(prevRecord.data.map((data) => data.next!.attrs.id))
      } else {
        this.setSelected(prevRecord.data.map((data) => data.prev!.attrs.id))
      }
    }

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
          addGraphNode(this, data.next)
        } else if (nextRecord.type === BasicRecordType.Delete) {
          // DELETE
          removeGraphNode(this, data.prev?.attrs?.id)
        }
      }

      if (nextRecord.type === BasicRecordType.Add) {
        this.setSelected(nextRecord.data.map((data) => data.next!.attrs.id))
      } else {
        this.setSelected(nextRecord.data.map((data) => data.prev!.attrs.id))
      }
    }

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

/** add canvas node */
const addGraphNode = (graph: PcGraph, element?: CDRecord) => {
  if (!graph.canvas.children || !element) return

  if (element.parent) {
    // bind graph canvas elements' paternity
    const graphParent = findNode(
      graph.canvas,
      (node) => node.attrs.id === element.parent?.attrs.id
    )
    if (graphParent) {
      graphParent.children?.push(new PcElement(element))
      element.parent = graphParent
    }
  }
}
/** remove canvas node */
const removeGraphNode = (graph: PcGraph, id?: string) => {
  if (!graph.canvas.children || !id) return

  const element = findNode(graph.canvas, (node) => node.attrs.id === id)

  if (element && graph.canvas.children) {
    removeTreeNode(
      graph.canvas.children,
      (node) => node.attrs.id === element.attrs.id
    )
  }
}
