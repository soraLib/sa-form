import { BasicGraph, GraphType, MousePosition } from '../graph'
import { BasicRecordStore, BasicRecordType, isCDRecordDataList, isURecordData, isURecordDataList } from '../record'
import { PcElement } from './element'
import { PcRecord, PcRecordStore } from './record'

import { findNode, findTreeNode, removeTreeNode, setObjectValues } from 'sugar-sajs'
import { cloneDeep, pick } from 'lodash-es'
import { getNextId } from '../utils/element'
import { PcClipBoard } from './clipboard'

type IdUpdateData = { id: string, data: Partial<PcElement['attrs']> }
type ElUpdateData = { element: PcElement, data: Partial<PcElement['attrs']> }

function isIdUpdateData(data: IdUpdateData | ElUpdateData): data is IdUpdateData {
  return Reflect.has(data, 'id')
}

/** pc graph */
export class PcGraph implements BasicGraph {
  type: GraphType
  canvas: PcElement
  history: BasicRecordStore
  clipboard: PcClipBoard
  selected: PcElement[] = []
  nextId: string
  isDrag = false
  mousePosition = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0
  }

  constructor(config: Partial<PcElement> & { attrs: {} }) {
    this.type = 'PcForm'
    this.history = new PcRecordStore()
    this.clipboard = new PcClipBoard()
    this.nextId = '1'
    this.canvas = new PcElement({
      parent: undefined,
      children: [],
      attrs: config.attrs
    })
  }

  setCanvas(canvas: PcElement) {
    this.canvas = canvas
    this.selected = [canvas]

    this.nextId = getNextId(canvas)
  }

  setDrag(isDrag: boolean) {
    this.isDrag = isDrag
  }

  setMouse(pos: Partial<MousePosition> = { x: 0, y: 0, startX: 0, startY: 0 }) {
    setObjectValues(this.mousePosition, pos)
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
    const parent = (typeof arg === 'string' ? findTreeNode(this.canvas.children!, node => node.attrs.id === arg) : arg) ?? this.canvas

    addGraphNode(this, child)

    // skip add record when it's undo or redo
    const record = new PcRecord({
      type: BasicRecordType.Add,
      time: new Date,
      data: [{
        next: {
          ...cloneDeep(child)
        }
      }]
    })

    this.addRecord(record)
    this.setSelected(child)

    return parent
  }

  /** add children and return their parent */
  addChildren(children: PcElement[], parent?: PcElement): PcElement
  addChildren(children: PcElement[], parent?: string): PcElement
  addChildren(children: PcElement[], arg?: string | PcElement): PcElement {
    const parent = (typeof arg === 'string' ? findTreeNode(this.canvas.children!, node => node.attrs.id === arg) : arg) ?? this.canvas

    for (const child of children) {
      addGraphNode(this, child)
    }

    // skip add record when it's undo or redo
    const record = new PcRecord({
      type: BasicRecordType.Add,
      time: new Date,
      data: children.map(child => ({
        next: {
          ...cloneDeep(child)
        }
      }))
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

    if (typeof arg === 'string') {
      const node = findNode(this.canvas, node => node.attrs.id === arg)

      if (node) {
        this.selected = [node]
      }

      return node
    }

    if (Array.isArray(arg)) {
      const selected: PcElement[] = []

      for (const item of arg) {
        if (typeof item === 'string') {
          const node = findNode(this.canvas, node => node.attrs.id === item)
          if (node) selected.push(node)
        } else {
          selected.push(item)
        }
      }

      this.selected = selected

      return selected
    }

    if (typeof arg === 'object') {
      this.selected = [arg]

      return arg
    }
  }

  updateElemData(id: string, data: Partial<PcElement['attrs']>, needRecord?: boolean): PcElement | undefined
  updateElemData(element: PcElement, data: Partial<PcElement['attrs']>, needRecord?: boolean): PcElement | undefined
  updateElemData(arg: string | PcElement, data: Partial<PcElement['attrs']>, needRecord = true) {
    if (!arg) return

    const element = typeof arg === 'string' ? findNode(this.canvas, node => node.attrs.id === arg) : arg

    if (!element) return undefined

    if (needRecord) {
      const record = new PcRecord({
        type: BasicRecordType.Attr,
        time: new Date(),
        data: [{
          id: element.attrs.id,
          prev: cloneDeep(pick(element.attrs, Object.keys(data))),
          next: cloneDeep(data)
        }]
      })

      this.addRecord(record)
    }

    setObjectValues(element.attrs, data)

    return element
  }

  updateElemsData(data: IdUpdateData[]): PcElement[] | undefined
  updateElemsData(data: ElUpdateData[]): PcElement[] | undefined
  updateElemsData(arg: IdUpdateData[] | ElUpdateData[]) {
    const batch = arg.map(data => ({
      el: isIdUpdateData(data) ? findNode(this.canvas, node => node.attrs.id === data.id)! : data.element,
      data: data.data
    }))

    const record = new PcRecord({
      type: BasicRecordType.Attr,
      time: new Date(),
      data: batch.map(u => ({
        id: u.el.attrs.id,
        prev: cloneDeep(pick(u.el.attrs, Object.keys(u.data))),
        next: cloneDeep(u.data)
      }))
    })

    this.addRecord(record)

    for (const update of batch) {
      this.updateElemData(update.el, update.data, false)
    }

    return batch.map(u => u.el)
  }

  /** add history record */
  addRecord(record: PcRecord) {
    console.log('[Sa info]: New record has been added.', record)

    if (this.history.index && this.history.records.length > this.history.index + 1) {
      this.history.records.splice(this.history.index + 1)
    }

    this.history.records.push(record)
    this.history.index += 1
  }

  undo() {
    const prevRecord = this.history.getPrevRecord()

    if (!prevRecord) {
      console.warn('[Sa warn]: None previous record in history.')

      return
    }

    if (isURecordDataList(prevRecord.data)) {
      for (const data of prevRecord.data) {
        const element = findNode(this.canvas, node => node.attrs.id === data.id)

        if (element) {
          setObjectValues(element.attrs, data.prev)
        }
      }

      this.setSelected(prevRecord.data.map(data => data.id))
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
        this.setSelected(prevRecord.data.map(data => data.next!.attrs.id))
      } else {
        this.setSelected(prevRecord.data.map(data => data.prev!.attrs.id))
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
        const element = findNode(this.canvas, node => node.attrs.id === data.id)

        if (element) {
          setObjectValues(element.attrs, data.next)
        }
      }

      this.setSelected(nextRecord.data.map(data => data.id))
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
        this.setSelected(nextRecord.data.map(data => data.next!.attrs.id))
      } else {
        this.setSelected(nextRecord.data.map(data => data.prev!.attrs.id))
      }
    }

    this.history.index += 1
  }
}

/** add canvas node */
function addGraphNode(graph: PcGraph, element?: PcElement) {
  if (!graph.canvas.children || !element) return

  if (element.parent) {
    // bind graph canvas elements' paternity
    const graphParent = findNode(graph.canvas, node => node.attrs.id === element.parent?.attrs.id)
    if (graphParent) {
      graphParent.children?.push(element)
      element.parent = graphParent
    }
  }
}

/** remove canvas node */
function removeGraphNode(graph: PcGraph, id?: string) {
  if (!graph.canvas.children || !id) return

  const element = findNode(graph.canvas, node => node.attrs.id === id)

  if (element && graph.canvas.children) {
    removeTreeNode(graph.canvas.children, node => node.attrs.id === element.attrs.id)
  }
}