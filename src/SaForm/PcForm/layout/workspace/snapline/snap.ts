import { PcElement, PcElementAttributes } from '../../../element'
import { getRectangle, Rect } from '../graph/renderer/utils/rectangle'

interface RowResult { lineY: number; triggerY: number }
interface ColResult { lineX: number; triggerX: number }
export interface Snapline {
  x?: number;
  y?: number;
}

const directions: Record<
  'row' | 'col',
  {
    name: string;
    calc(
      compare: PcElement,
      target: Rect
    ):
      | ColResult
      | RowResult;
  }[]
> = {
  row: [
    {
      name: 'tt',
      calc: compare => ({
        lineY: compare.attrs.y,
        triggerY: compare.attrs.y
      })
    },
    {
      name: 'bt',
      calc: (compare, target) => ({
        lineY: compare.attrs.y,
        triggerY: compare.attrs.y - target.height
      })
    },
    {
      name: 'cc',
      calc: (compare, target) => ({
        lineY: compare.attrs.y + compare.attrs.height / 2,
        triggerY:
          compare.attrs.y +
          compare.attrs.height / 2 -
          target.height / 2
      })
    },
    {
      name: 'tb',
      calc: compare => ({
        lineY: compare.attrs.y + compare.attrs.height,
        triggerY: compare.attrs.y + compare.attrs.height
      })
    },
    {
      name: 'bb',
      calc: (compare, target) => ({
        lineY: compare.attrs.y + compare.attrs.height,
        triggerY:
          compare.attrs.y + compare.attrs.height - target.height
      })
    }
  ],
  col: [
    {
      name: 'll',
      calc: compare => ({
        lineX: compare.attrs.x,
        triggerX: compare.attrs.x
      })
    },
    {
      name: 'lr',
      calc: compare => ({
        lineX: compare.attrs.x + compare.attrs.width,
        triggerX: compare.attrs.x + compare.attrs.width
      })
    },
    {
      name: 'cc',
      calc: (compare, target) => ({
        lineX: compare.attrs.x + compare.attrs.width / 2,
        triggerX: compare.attrs.x + compare.attrs.width / 2 - target.width / 2
      })
    },
    {
      name: 'rr',
      calc: (compare, target) => ({
        lineX: compare.attrs.x + compare.attrs.width,
        triggerX: compare.attrs.x + compare.attrs.width - target.width
      })
    },
    {
      name: 'rl',
      calc: (compare, target) => ({
        lineX: compare.attrs.x,
        triggerX: compare.attrs.x - target.width
      })
    }
  ]
}

// element adsorb distance (px)
const threshold = 10
const isSorption = (a: number, b: number) => Math.abs(a - b) <= threshold

const calcLines = (targets: PcElement[], compares: PcElement[], { deepOffsetX, deepOffsetY }: { deepOffsetX: number, deepOffsetY: number }) => {
  const rect = getRectangle(targets)
  const rectIdSet = new Set(targets.map(t => t.attrs.id))

  const snaplines = new Map<string, Snapline>()
  const sorption = {
    row: false,
    col: false
  }

  for (const compare of compares) {
    // skip self compare
    if (rectIdSet.has(compare.attrs.id)) continue

    // row snaplines
    for (const direct of directions.row) {
      const result = direct.calc(compare, rect)
      const { lineY, triggerY } = result as RowResult

      if (isSorption(rect.y, triggerY)) {

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

      if (isSorption(rect.x, triggerX)) {
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

export const getSnaplines = (
  elements: PcElement[],
  compares?: PcElement[]
): Map<string, Snapline> => {
  if (!elements.length) return new Map()

  const parent = elements[0].parent
  const _compares = compares ?? parent?.children ?? []

  const deepOffsetX = getDeepOffset('x', parent)
  const deepOffsetY = getDeepOffset('y', parent)

  return calcLines(elements, _compares, { deepOffsetX, deepOffsetY })
}

const getDeepOffset = (attr: keyof Pick<PcElementAttributes, 'x' | 'y'>, element?: PcElement): number =>
  element ?
    (element.parent ? getDeepOffset(attr, element.parent) : 0) + element.attrs[attr]
    : 0
