import { findNode } from 'sugar-sajs'
import { BasicGraph } from '../graph'
import type { BasicElement, BasicElementAttributes } from '../element'

/**
 * return next unique id
 */
export function getNextId(element: BasicElement): string {
  const nextId = getMaxId(element)
  const nextIdNumber = Number(nextId)

  return nextIdNumber ? (nextIdNumber + 1).toString() : '1'

  function getMaxId(element: BasicElement): string {
    const nextId = element.attrs.id
    let childId = ''

    if (element.children?.length) {
      for (const child of element.children) {
        const childNextId = getMaxId(child)

        const childIdNumber = Number(childId)
        const childNextIdNumber = Number(childNextId)

        if (childIdNumber && childNextIdNumber) {
          childId = Math.max(childIdNumber, childNextIdNumber).toString()
        }

        if (childNextIdNumber) childId = childNextId
      }
    }

    const childIdNumber = Number(childId)
    const nextIdNumber = Number(nextId)

    if (childIdNumber && nextIdNumber) {
      return Math.max(childIdNumber, nextIdNumber).toString()
    }

    if (childIdNumber) return childId

    return nextId
  }
}

export function isElementAttribute(
  attr: string,
  elem: BasicElement
): attr is keyof BasicElementAttributes {
  return Reflect.has(elem.attrs, attr)
}
