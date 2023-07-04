import type { BasicGraph } from './graph'
import type { BasicElement } from './element'

export declare interface BasicClipBoard {
  clips:
    | {
        elements: BasicElement[]
        type: 'cut' | 'copy'
      }
    | undefined

  isEmpty(): boolean

  copy(
    graph: BasicGraph,
    options?: { useLocalStorage?: boolean; deep?: boolean }
  ): void
  cut(
    graph: BasicGraph,
    options?: { useLocalStorage?: boolean; deep?: boolean }
  ): void

  paste(
    graph: BasicGraph,
    parent: string | undefined,
    options?: {
      nodeProps?: (element: BasicElement) => Partial<BasicElement['attrs']>
      deep?: boolean
    }
  ): BasicElement[] | undefined
}
