import { isTab } from '../PcForm/element'
import type { BasicElement, BasicElementAttributes } from '../element'

export function isElementAttribute(
  attr: string,
  elem: BasicElement
): attr is keyof BasicElementAttributes {
  return Reflect.has(elem.attrs, attr)
}

/** returns target siblings nodes, returns canvas children if elem is a root. */
export const getSiblings = <A extends BasicElement>(elem: A): A[] => {
  if (!elem) return []

  // root
  if (!elem.parent) {
    return elem.children as A[]
  }

  const parent = elem.parent

  if (isTab(parent))
    return parent.tabs[parent.attrs['tab-index']].children as A[]

  return parent.children as A[]
}

/** return node paths */
export const getPaths = <A extends BasicElement>(elem: A): A[] => {
  if (!elem) return []

  const paths: A[] = [elem]

  let parent = elem.parent
  while (parent && parent.parent) {
    paths.unshift(parent as A)
    parent = parent.parent
  }

  return paths
}
