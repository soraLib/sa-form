import type { BasicGraph } from './graph'
import type { BasicElement } from './element'

export type Position = {
  left: number
  top: number
}

export declare interface BasicClipBoard {
  graph: BasicGraph
  clips:
    | {
        elements: BasicElement[]
        type: 'cut' | 'copy'
      }
    | undefined

  isEmpty(): boolean

  copy(options?: { useLocalStorage?: boolean; deep?: boolean }): void
  cut(options?: { useLocalStorage?: boolean; deep?: boolean }): void
  paste(
    parent: BasicElement,
    position: Position,
    options?: {
      nodeProps?: (element: BasicElement) => Partial<BasicElement['attrs']>
      deep?: boolean
    }
  ): BasicElement[] | undefined
}
