import { getRectangle } from '../graph/renderer/utils/rectangle'
import { firstOfStick, lastOfStick } from '../graph/renderer/element-renderer'
import type { PcElement, PcElementAttributes } from '../../../element'
import type { Rect } from '../graph/renderer/utils/rectangle'
import type { PcGraph } from '../../../graph'

interface RowResult {
  lineY: number
  triggerY: number
}
interface ColResult {
  lineX: number
  triggerX: number
}
type CalcResult = RowResult | ColResult

const directions: Record<
  'row' | 'col',
  {
    name: string
    calc: (compare: PcElement, target: Rect) => CalcResult
  }[]
> = {
  row: [
    {
      name: 'tt',
      calc: (compare) => ({
        lineY: compare.attrs.y,
        triggerY: compare.attrs.y,
      }),
    },
    {
      name: 'bt',
      calc: (compare, target) => ({
        lineY: compare.attrs.y,
        triggerY: compare.attrs.y - target.height,
      }),
    },
    {
      name: 'cc',
      calc: (compare, target) => ({
        lineY: compare.attrs.y + compare.attrs.height / 2,
        triggerY:
          compare.attrs.y + compare.attrs.height / 2 - target.height / 2,
      }),
    },
    {
      name: 'tb',
      calc: (compare) => ({
        lineY: compare.attrs.y + compare.attrs.height,
        triggerY: compare.attrs.y + compare.attrs.height,
      }),
    },
    {
      name: 'bb',
      calc: (compare, target) => ({
        lineY: compare.attrs.y + compare.attrs.height,
        triggerY: compare.attrs.y + compare.attrs.height - target.height,
      }),
    },
  ],
  col: [
    {
      name: 'll',
      calc: (compare) => ({
        lineX: compare.attrs.x,
        triggerX: compare.attrs.x,
      }),
    },
    {
      name: 'lr',
      calc: (compare) => ({
        lineX: compare.attrs.x + compare.attrs.width,
        triggerX: compare.attrs.x + compare.attrs.width,
      }),
    },
    {
      name: 'cc',
      calc: (compare, target) => ({
        lineX: compare.attrs.x + compare.attrs.width / 2,
        triggerX: compare.attrs.x + compare.attrs.width / 2 - target.width / 2,
      }),
    },
    {
      name: 'rr',
      calc: (compare, target) => ({
        lineX: compare.attrs.x + compare.attrs.width,
        triggerX: compare.attrs.x + compare.attrs.width - target.width,
      }),
    },
    {
      name: 'rl',
      calc: (compare, target) => ({
        lineX: compare.attrs.x,
        triggerX: compare.attrs.x - target.width,
      }),
    },
  ],
}

const isSorption = (a: number, b: number, threshold: number) =>
  Math.abs(a - b) <= threshold

interface CalcOption {
  deepOffsetX: number
  deepOffsetY: number
  graph: PcGraph
}
const calcDragLines = (
  targets: PcElement[],
  compares: PcElement[],
  { deepOffsetX, deepOffsetY, graph }: CalcOption
) => {
  const rect = getRectangle(targets)
  const rectIdSet = new Set(targets.map((t) => t.attrs.id))

  const snaplines = new Map<string, Snapline>()
  const sorption = {
    row: false,
    col: false,
  }

  for (const compare of compares) {
    // skip self compare
    if (rectIdSet.has(compare.attrs.id)) continue

    // row snaplines
    for (const direct of directions.row) {
      const result = direct.calc(compare, rect)
      const { lineY, triggerY } = result as RowResult

      if (isSorption(rect.y, triggerY, graph.snapline.threshold)) {
        if (!sorption.row) {
          const moveY = triggerY - rect.y
          for (const elem of targets) {
            elem.attrs.y += moveY
          }
          rect.y = triggerY
          sorption.row = true
        }

        if (!sorption.row || rect.y === triggerY) {
          snaplines.set(`r${direct.name[0]}`, { y: lineY + deepOffsetY })
        }
      }
    }

    // column snaplines
    for (const direct of directions.col) {
      const result = direct.calc(compare, rect)
      const { lineX, triggerX } = result as ColResult

      if (isSorption(rect.x, triggerX, graph.snapline.threshold)) {
        if (!sorption.col) {
          const moveX = triggerX - rect.x
          for (const elem of targets) {
            elem.attrs.x += moveX
          }
          rect.x = triggerX
          sorption.col = true
        }

        if (!sorption.col || rect.x === triggerX) {
          snaplines.set(`c${direct.name[0]}`, { x: lineX + deepOffsetX })
        }
      }
    }
  }

  return snaplines
}

const calcResizeLines = (
  target: PcElement,
  compares: PcElement[],
  { deepOffsetX, deepOffsetY, graph }: CalcOption
) => {
  const rect = getRectangle([target])

  const snaplines = new Map<string, Snapline>()
  const sorption = {
    row: false,
    col: false,
  }

  for (const compare of compares) {
    // skip self compare
    if (compare === target) continue

    // row snaplines
    for (const direct of directions.row) {
      // skip snap on cc
      if (direct.name === 'cc') continue

      const result = direct.calc(compare, rect)
      const { lineY, triggerY } = result as RowResult

      if (isSorption(rect.y, triggerY, graph.snapline.threshold)) {
        let resized = false

        if (!sorption.row && graph.resizeStick) {
          const stickY = firstOfStick(graph.resizeStick)

          if (stickY === 't' && direct.name[0] === 't') {
            target.attrs.height = target.attrs.height + target.attrs.y - lineY
            target.attrs.y = lineY
            sorption.row = true
            resized = true
          }

          if (stickY === 'b' && direct.name[0] === 'b') {
            target.attrs.height = lineY - target.attrs.y
            sorption.row = true
            resized = true
          }
        }

        if (resized || rect.y === triggerY) {
          snaplines.set(`r${direct.name[0]}`, { y: lineY + deepOffsetY })
        }
      }
    }

    // column snaplines
    for (const direct of directions.col) {
      // skip snap on cc
      if (direct.name === 'cc') continue

      const result = direct.calc(compare, rect)
      const { lineX, triggerX } = result as ColResult

      if (isSorption(rect.x, triggerX, graph.snapline.threshold)) {
        let resized = false
        if (!sorption.col && graph.resizeStick) {
          const stickX = lastOfStick(graph.resizeStick)

          if (stickX === 'l' && direct.name[0] === 'l') {
            target.attrs.width = target.attrs.width + target.attrs.x - lineX
            target.attrs.x = lineX
            sorption.row = true
            resized = true
          }

          if (stickX === 'r' && direct.name[0] === 'r') {
            target.attrs.width = lineX - target.attrs.x
            sorption.row = true
            resized = true
          }
        }

        if (resized || rect.x === triggerX) {
          snaplines.set(`c${direct.name[0]}`, { x: lineX + deepOffsetX })
        }
      }
    }
  }

  return snaplines
}

export interface Snapline {
  x?: number
  y?: number
}
export type SnapType = 'drag' | 'resize'
export const onSnapping = (
  type: SnapType,
  graph: PcGraph,
  elements: PcElement[],
  compares?: PcElement[]
): Map<string, Snapline> => {
  if (!elements.length) return new Map()

  const parent = elements[0].parent
  if (!parent) return new Map()

  const _compares = compares ?? parent?.children ?? []

  const deepOffsetX = getDeepOffset('x', parent)
  const deepOffsetY = getDeepOffset('y', parent)
  const optiopns = { deepOffsetX, deepOffsetY, graph }

  return type === 'drag'
    ? calcDragLines(elements, _compares, optiopns)
    : calcResizeLines(elements[0], _compares, optiopns)
}

const getDeepOffset = (
  attr: keyof Pick<PcElementAttributes, 'x' | 'y'>,
  element: PcElement
): number =>
  (element.parent ? getDeepOffset(attr, element.parent) : 0) +
  element.attrs[attr]
