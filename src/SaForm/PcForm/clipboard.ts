import { cloneDeep } from 'lodash-es'
import { findNode, setObjectValues } from 'sugar-sajs'
import { BasicClipBoard } from '../clipboard'
import { PcGraph } from './graph'
import { PcElement } from './element'

export class PcClipBoard implements BasicClipBoard {
  clips: {
    elements: PcElement[]
    type: 'cut' | 'copy'
  } | undefined = undefined

  isEmpty(clip = this.clips): clip is undefined {
    return !this.clips?.elements.length
  }

  copy(graph: PcGraph, options?: { useLocalStorage?: boolean, deep?: boolean }) {
    this.clips = {
      elements: cloneDeep(graph.selected), // TODO: options
      type: 'copy'
    }
  }

  cut(graph: PcGraph, options?: { useLocalStorage?: boolean, deep?: boolean }) {
    this.clips = {
      elements: cloneDeep(graph.selected), // TODO: options
      type: 'cut'
    }
  }

  paste(graph: PcGraph, parent = graph.canvas.attrs.id, options?: {
    nodeProps?: (element: PcElement) => Partial<PcElement['attrs']>
    deep?: boolean
  }): PcElement[] | undefined {
    if (this.isEmpty(this.clips)) return

    const parentElement = findNode(graph.canvas, n => n.attrs.id === parent)

    if (!parentElement) {
      console.warn('[Sa warn]: can not paste without parent element.')

      return
    }

    const newPasteElements = this.clips.elements.map(ele => {
      const paste = new PcElement({ ...ele, parent: parentElement })

      if (options?.nodeProps) {
        setObjectValues(paste.attrs, options.nodeProps(ele))
      }

      return paste
    })

    graph.addChildren(newPasteElements, parent)

    return newPasteElements
  }
}