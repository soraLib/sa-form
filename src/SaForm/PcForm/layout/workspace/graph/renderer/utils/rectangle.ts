import type { BasicElement } from '../../../../../../element'

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

/** Creates rectangle from multi elements */
export const getRectangle = <A extends BasicElement>(elements: A[]): Rect => {
  if (!elements.length) return { x: 0, y: 0, width: 0, height: 0 }

  let minX = Number.POSITIVE_INFINITY
  let maxX = Number.NEGATIVE_INFINITY

  let minY = Number.POSITIVE_INFINITY
  let maxY = Number.NEGATIVE_INFINITY

  for (const element of elements) {
    if (element.attrs.x < minX) {
      minX = element.attrs.x
    }
    if (maxX < element.attrs.x + element.attrs.width) {
      maxX = element.attrs.x + element.attrs.width
    }
    if (element.attrs.y < minY) {
      minY = element.attrs.y
    }
    if (maxY < element.attrs.y + element.attrs.height) {
      maxY = element.attrs.y + element.attrs.height
    }
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  }
}
