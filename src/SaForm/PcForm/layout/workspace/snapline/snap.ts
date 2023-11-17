import { getRectangle } from '../graph/renderer/utils/rectangle'
import { firstOfStick, lastOfStick } from '../graph/renderer/element-renderer'
import { isCoincide } from '../graph/renderer/hooks/useSelect'
import type { PcElement, PcElementAttributes } from '../../../element'
import type { Rect } from '../graph/renderer/utils/rectangle'
import type { PcGraph } from '../../../graph'
import type { Position } from '@/SaForm/graph'
import type { BasicElement } from '@/SaForm/element'

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

const isSorption = (a: number, b: number, radius: number) =>
  Math.abs(a - b) <= radius

interface CalcOption {
  deepOffsetX: number
  deepOffsetY: number
  graph: PcGraph
  positions: [Position, Position]
}
const calcDragLines = (
  targets: PcElement[],
  compares: PcElement[],
  { deepOffsetX, deepOffsetY, graph, positions: [pointA, pointB] }: CalcOption
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

      const isMovingCloser =
        (rect.y >= lineY && pointA.y - pointB.y <= 0) ||
        (rect.y <= lineY && pointA.y - pointB.y >= 0)

      if (
        // attempt to snap to row when get closer
        isMovingCloser &&
        isSorption(rect.y, triggerY, graph.snapline.radius)
      ) {
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

      const isMovingCloser =
        (rect.x >= lineX && pointA.x - pointB.x <= 0) ||
        (rect.x <= lineX && pointA.x - pointB.x >= 0)

      if (
        // attempt to snap to row when get closer
        isMovingCloser &&
        isSorption(rect.x, triggerX, graph.snapline.radius)
      ) {
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

      if (isSorption(rect.y, triggerY, graph.snapline.radius)) {
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

      if (isSorption(rect.x, triggerX, graph.snapline.radius)) {
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

function calcDistance(rect1: Rect, rect2: Rect): number {
  // [1111]
  // [1[xx]2]
  //   [2222]
  if (isCoincide(rect1, rect2)) return 0
  //        [1111]
  //        [1111]
  //        |||
  //     [2222]
  //     [2222]
  const coincideVertically = !(
    rect1.x + rect1.width < rect2.x || rect1.x > rect2.x + rect2.width
  )
  if (coincideVertically) {
    if (rect1.y + rect1.height < rect2.y)
      return rect2.y - (rect1.y + rect1.height)
    return rect1.y - (rect2.y + rect2.height)
  }
  //         [111]
  // [222]---[111]
  // [222]
  const coincideHorizontally = !(
    rect1.y + rect1.height < rect2.y || rect1.y > rect2.y + rect2.height
  )
  if (coincideHorizontally) {
    if (rect1.x + rect1.width < rect2.x)
      return rect2.x - (rect1.x + rect1.width)
    return rect1.x - (rect2.x + rect2.width)
  }
  if (rect1.x < rect2.x) {
    // [1] 一
    //  | [2]
    if (rect1.y < rect2.y)
      return Math.sqrt(
        (rect2.x - (rect1.x + rect1.width)) ** 2 +
          (rect2.y - (rect1.y + rect1.height)) ** 2
      )
    //  | [2]
    // [1] 一
    return Math.sqrt(
      (rect2.x - (rect1.x + rect1.width)) ** 2 +
        (rect1.y - (rect2.y + rect2.height)) ** 2
    )
  }
  //  | [1]
  // [2] 一
  if (rect1.y < rect2.y)
    return Math.sqrt(
      (rect1.x - (rect2.x + rect2.width)) ** 2 +
        (rect2.y - (rect1.y + rect1.height)) ** 2
    )
  // [2] 一
  //  | [1]
  return Math.sqrt(
    (rect1.x - (rect2.x + rect2.width)) ** 2 +
      (rect1.y - (rect2.y + rect2.height)) ** 2
  )
}

export const sortByDistance = (
  rect: Rect,
  others: BasicElement[]
): BasicElement[] =>
  others
    .map((element) => {
      return {
        element,
        distance: calcDistance(rect, {
          x: element.attrs.x,
          y: element.attrs.y,
          width: element.attrs.width,
          height: element.attrs.height,
        }),
      }
    })
    .sort((a, b) => a.distance - b.distance)
    .map(({ element }) => element)

export interface Snapline {
  x?: number
  y?: number
}
export type SnapType = 'drag' | 'resize'
export const onSnapping = (
  type: SnapType,
  graph: PcGraph,
  elements: PcElement[],
  compares: PcElement[] | undefined,
  positions: [Position, Position]
): Map<string, Snapline> => {
  if (!elements.length) return new Map()

  const parent = elements[0].parent
  if (!parent) return new Map()

  const _compares = sortByDistance(
    getRectangle(elements),
    (compares ?? parent?.children ?? []).filter(
      (elem) => elem.attrs['is-draft'] === elements[0].attrs['is-draft']
    )
  )

  const deepOffsetX = getDeepOffset('x', parent)
  const deepOffsetY = getDeepOffset('y', parent)
  const optiopns = {
    deepOffsetX,
    deepOffsetY,
    graph,
    positions,
  }

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
