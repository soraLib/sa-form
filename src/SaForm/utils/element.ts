import type { BasicElement, BasicElementAttributes } from '../element'

export function isElementAttribute(
  attr: string,
  elem: BasicElement
): attr is keyof BasicElementAttributes {
  return Reflect.has(elem.attrs, attr)
}
