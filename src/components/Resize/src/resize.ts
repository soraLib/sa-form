import { isNumber } from 'lodash-es'
import { type ElementSize, isObject } from '@vueuse/core'

export type ResizeSize = Partial<ElementSize>
export type ResizeDirection = 'left' | 'top' | 'right' | 'bottom'

export const resizeEmits = {
  resizing: (size: Partial<ElementSize>) => isObject(size),
  'update:width': (width: number) => isNumber(width),
  'update:height': (height: number) => isNumber(height),
}

export type ResizeEmits = typeof resizeEmits
