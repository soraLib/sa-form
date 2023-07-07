import { cloneDeep } from 'lodash-es'
import { findNode, setObjectValues } from 'sugar-sajs'
import { PcElement } from './element'
import type { BasicClipBoard, Position } from '../clipboard'
import type { PcGraph } from './graph'

export class PcClipBoard implements BasicClipBoard {
  clips:
    | {
        elements: PcElement[]
        type: 'cut' | 'copy'
      }
    | undefined = undefined

  isEmpty(clip = this.clips): clip is undefined {
    return !this.clips?.elements.length
  }

  copy(
    graph: PcGraph,
    options?: { useLocalStorage?: boolean; deep?: boolean }
  ) {
    this.clips = {
      elements: cloneDeep(graph.selected), // TODO: options
      type: 'copy',
    }
  }

  cut(graph: PcGraph, options?: { useLocalStorage?: boolean; deep?: boolean }) {
    this.clips = {
      elements: cloneDeep(graph.selected), // TODO: options
      type: 'cut',
    }
  }

  paste(
    graph: PcGraph,
    parent = graph.canvas,
    position: Position,
    options?: {
      nodeProps?: (element: PcElement) => Partial<PcElement['attrs']>
      deep?: boolean
    }
  ): PcElement[] | undefined {
    if (this.isEmpty(this.clips)) return

    const newPasteElements = this.clips.elements.map((ele) => {
      const paste = new PcElement({
        parent,
        children: undefined /* TODO: */,
        /* TODO: position offset */
        attrs: {
          ...ele.attrs,
          id: graph.getNextId(),
          x: position.left,
          y: position.top,
        },
      })

      if (options?.nodeProps) {
        setObjectValues(paste.attrs, options.nodeProps(ele))
      }

      return paste
    })

    graph.addChildren(newPasteElements, parent)

    return newPasteElements
  }
}
