import { cloneDeep } from 'lodash-es'
import { isTab } from '../PcForm/element'
import { findNode } from '../PcForm/utils/node'
import type { TabPane } from '../PcForm/element'
import type {
  BasicElement,
  BasicElementAttributes,
  BasicElementBase,
} from '@/SaForm/element'
import type { BasicGraph } from '@/SaForm/graph'
import type { CDRecord } from '@/SaForm/record'

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

export const getDeepOffset = (
  element: BasicElement,
  attr: keyof Pick<BasicElementAttributes, 'x' | 'y'>
): number =>
  (element.parent ? getDeepOffset(element.parent, attr) : 0) +
  (attr === 'y' && isTab(element) ? element.attrs['tab-height'] : 0) +
  element.attrs[attr] +
  (element.attrs['border-width'] &&
  element.attrs['border-style'] &&
  element.attrs['border-style'] !== 'none'
    ? element.attrs['border-width']
    : 0)

export const createCopyName = (set: Set<string>, name: string): string => {
  if (!name) return ''
  if (!set.has(name)) return name

  const reg = /^(.+?)_copy(_(\d+))?$/
  const match = name.match(reg)

  if (!match) return createCopyName(set, `${name}_copy`)

  return createCopyName(set, `${match[1]}_copy_${+(match[3] ?? 0) + 1}`)
}

export const createElementRecursively = <A extends BasicElement>(
  element: Pick<A, 'attrs' | 'children'> & Partial<Pick<A, 'tabs'>>,
  parent: A | undefined,
  ctor: new (options: BasicElementBase) => A,
  option: {
    createId?: boolean
    graph: BasicGraph
    findNode: typeof findNode
  }
): A => {
  const id = option.createId
    ? option.graph.getNextId()
    : !findNode(option.graph.canvas, (a) => a.attrs.id === element.attrs.id)
    ? element.attrs.id
    : option.graph.getNextId()
  const created = new ctor({
    parent,
    attrs: {
      ...element.attrs,
      name: createCopyName(option.graph.nameSet, element.attrs.name),
      id,
    },
  })

  if (element.children) {
    created.children = element.children.map((child) =>
      createElementRecursively(child, created, ctor, option)
    )
  }

  if (isTab(element)) {
    if (element.tabs) {
      created.tabs = element.tabs.map((tab) => ({
        id: tab.id,
        label: tab.label,
        children: tab.children.map((child) =>
          createElementRecursively(child, created, ctor, option)
        ),
      }))
    } else {
      created.tabs = element.attrs.tabs.map((tab) => ({
        ...tab,
        id: tab.id,
        children: [],
      }))
    }
  }

  return created
}

export const extractPureNodeRecursively = (
  a: CDRecord,
  option?: {
    withoutParent: boolean
  }
): CDRecord => {
  const base: CDRecord = {
    attrs: cloneDeep(a.attrs),
  }

  if (!option?.withoutParent) {
    base.parent = a.parent
  }

  if (a.children) {
    base.children = a.children.map((a) =>
      extractPureNodeRecursively(a, { withoutParent: true })
    ) as BasicElement[]
  }
  if (a.tabs) {
    base.tabs = a.tabs.map((tab) => {
      return {
        ...tab,
        children: tab.children.map((a) =>
          extractPureNodeRecursively(a, { withoutParent: true })
        ),
      }
    }) as TabPane[]
  }

  return base
}

interface Rectangle {
  x: number
  y: number
  width: number
  height: number
}
const isCoincide = (a: Rectangle, b: Rectangle): boolean =>
  !(
    a.x + a.width < b.x ||
    a.x > b.x + b.width ||
    a.y > b.y + b.height ||
    a.y + a.height < b.y
  )
function calcDistance(rect1: Rectangle, rect2: Rectangle): number {
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
  rect: Rectangle,
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
