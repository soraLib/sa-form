import { cloneDeep } from 'lodash-es'
import { setObjectValues } from 'sugar-sajs'
import { BasicRecordType } from '../record'
import { createElementRecursively } from '../utils/element'
import { PcElement } from './element'
import { PcRecord } from './record'
import { findNode } from './utils/node'
import type { BasicClipBoard, Position } from '../clipboard'
import type { PcGraph } from './graph'

export class PcClipBoard implements BasicClipBoard {
  graph: PcGraph
  clips:
    | {
        elements: PcElement[]
        type: 'cut' | 'copy'
        times: number
      }
    | undefined = undefined
  offset = 30

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
    const targets = options?.elements ?? this.graph.selected // TODO: options
    if (targets.includes(this.graph.canvas)) return

    this.clips = {
      elements: cloneDeep(targets),
      type: 'copy',
      times: 1,
    }
  }

  cut(options?: {
    useLocalStorage?: boolean
    deep?: boolean
    elements?: PcElement[]
  }) {
    const targets = options?.elements ?? this.graph.selected // TODO: options
    if (targets.includes(this.graph.canvas)) return

    this.clips = {
      elements: cloneDeep(targets),
      type: 'cut',
      times: 1,
    }

    const record = new PcRecord({
      type: BasicRecordType.Delete,
      data: this.clips.elements.map((ele) => ({
        name: ele.attrs.name,
        prev: ele,
      })),
    })

    for (const ele of this.clips.elements) {
      this.graph.remove(ele.attrs.id, false)
    }

    this.graph.addRecord(record)
  }

  paste(
    parent?: PcElement,
    options?: {
      position?: Position
      nodeProps?: (element: PcElement) => Partial<PcElement['attrs']>
      deep?: boolean
    }
  ): PcElement[] | undefined {
    const clips = this.clips
    if (this.isEmpty(clips)) return

    const pasteTo = parent ?? clips.elements[0].parent
    const newPasteElements = clips.elements.map((ele) => {
      const paste = createElementRecursively(
        {
          attrs: {
            ...ele.attrs,
            x:
              options?.position?.left ??
              ele.attrs.x + clips.times * this.offset,
            y:
              options?.position?.top ?? ele.attrs.y + clips.times * this.offset,
            'is-draft': this.graph.isDraft,
          },
          children: ele.children,
          tabs: ele.tabs,
        },
        pasteTo,
        PcElement,
        {
          createId: clips.type === 'copy',
          graph: this.graph,
          findNode,
        }
      )

      if (options?.nodeProps) {
        setObjectValues(paste.attrs, options.nodeProps(ele))
      }

      return paste
    })

    this.graph.addChildren(newPasteElements, pasteTo)
    clips.times += 1

    return newPasteElements
  }
}
