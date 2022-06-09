import { PcElement } from '../../../element'

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
      target: PcElement
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
        triggerY: compare.attrs.y - target.attrs.height
      })
    },
    {
      name: 'cc',
      calc: (compare, target) => ({
        lineY: compare.attrs.y + compare.attrs.height / 2,
        triggerY:
          compare.attrs.y +
          compare.attrs.height / 2 -
          target.attrs.height / 2
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
          compare.attrs.y + compare.attrs.height - target.attrs.height
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
        triggerX: compare.attrs.x + compare.attrs.width / 2 - target.attrs.width / 2
      })
    },
    {
      name: 'rr',
      calc: (compare, target) => ({
        lineX: compare.attrs.x + compare.attrs.width,
        triggerX: compare.attrs.x + compare.attrs.width - target.attrs.width
      })
    },
    {
      name: 'rl',
      calc: (compare, target) => ({
        lineX: compare.attrs.x,
        triggerX: compare.attrs.x - target.attrs.width
      })
    }
  ]
}

// element adsorb distance (px)
const threshold = 10
const isSorption = (a: number, b: number) => Math.abs(a - b) <= threshold

const calcLines = (target: PcElement, compares: PcElement[]) => {
  const x = target.attrs.x
  const y = target.attrs.y

  const snaplines = new Map<string, Snapline>()
  const sorption = {
    row: false,
    col: false
  }

  for (const compare of compares) {
    // skip self compare
    if (compare.attrs.id === target.attrs.id) continue

    // row snaplines
    for (const direct of directions.row) {
      const result = direct.calc(compare, target)
      const { lineY, triggerY } = result as RowResult

      if (isSorption(y, triggerY)) {

        if (!sorption.row) {
          target.attrs.y = triggerY
          sorption.row = true
        }

        if (!sorption.row || target.attrs.y === triggerY) {
          snaplines.set(`r${direct.name[0]}`, { y: lineY })
        }
      }
    }

    // column snaplines
    for (const direct of directions.col) {
      const result = direct.calc(compare, target)
      const { lineX, triggerX } = result as ColResult

      if (isSorption(x, triggerX)) {
        if (!sorption.col) {
          target.attrs.x = triggerX
          sorption.col = true
        }

        if (!sorption.col || target.attrs.x === triggerX) {
          snaplines.set(`c${direct.name[0]}`, { x: lineX })
        }
      }
    }
  }

  return snaplines
}

export const getSnaplines = (
  element: PcElement,
  compares?: PcElement[]
) => {
  const _compares = compares ?? element.parent?.children ?? []

  return calcLines(element, _compares)
}
