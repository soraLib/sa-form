import { cloneDeep } from 'lodash-es'
import { findNode, setObjectValues } from 'sugar-sajs'
import { BasicRecordType } from '../record'
import { PcElement } from './element'
import { PcRecord } from './record'
import type { BasicClipBoard, Position } from '../clipboard'
import type { PcGraph } from './graph'

export class PcClipBoard implements BasicClipBoard {
  graph: PcGraph
  clips:
    | {
        elements: PcElement[]
        type: 'cut' | 'copy'
      }
    | undefined = undefined

  constructor(graph: PcGraph) {
    this.graph = graph
  }

  isEmpty(clip = this.clips): clip is undefined {
    return !this.clips?.elements.length
  }

  copy(options?: {
    useLocalStorage?: boolean
    deep?: boolean
    elements?: PcElement[]
  }) {
    this.clips = {
      elements: cloneDeep(options?.elements ?? this.graph.selected), // TODO: options
      type: 'copy',
    }
  }

  cut(options?: {
    useLocalStorage?: boolean
    deep?: boolean
    elements?: PcElement[]
  }) {
    this.clips = {
      elements: cloneDeep(options?.elements ?? this.graph.selected), // TODO: options
      type: 'cut',
    }

    const record = new PcRecord({
      type: BasicRecordType.Delete,
      data: this.clips.elements.map((ele) => ({
        name: ele.attrs.name,
        prev: ele,
      })),
    })

    for (const ele of this.clips.elements) {
      this.graph.removeChild(ele.attrs.id, false)
    }

    this.graph.addRecord(record)
  }

  paste(
    parent: PcElement,
    position: Position,
    options?: {
      nodeProps?: (element: PcElement) => Partial<PcElement['attrs']>
      deep?: boolean
    }
  ): PcElement[] | undefined {
    const clips = this.clips
    if (this.isEmpty(clips)) return

    const newPasteElements = clips.elements.map((ele) => {
      const id =
        clips.type === 'cut' &&
        findNode(this.graph.canvas, (a) => a.attrs.id === ele.attrs.id)
          ? this.graph.getNextId()
          : ele.attrs.id

      const paste = new PcElement({
        parent,
        children: undefined /* TODO: */,
        /* TODO: position offset */
        attrs: {
          ...ele.attrs,
          id,
          x: position.left,
          y: position.top,
        },
      })

      if (options?.nodeProps) {
        setObjectValues(paste.attrs, options.nodeProps(ele))
      }

      return paste
    })

    this.graph.addChildren(newPasteElements, parent)

    return newPasteElements
  }
}
