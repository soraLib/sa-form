import { useEventListener } from '@vueuse/core'
import type { Ref } from 'vue'
import type { ResizeDirection } from './resize'
import type { ElementSize, MaybeRefOrGetter } from '@vueuse/core'

export type OnResizingFn = (size: { width?: number; height?: number }) => void
export type UseStickOptions = {
  direction: ResizeDirection
  origin: Ref<Partial<ElementSize>>
  onResizing: OnResizingFn
  min?: number
  max?: number
}
export const useStickResize = (
  target: MaybeRefOrGetter<HTMLElement | undefined | null>,
  options: UseStickOptions
) => {
  useEventListener(target, 'mousedown', (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    useStickResizing({
      ...options,
      event,
    })
  })
}

const useStickResizing = (options: UseStickOptions & { event: MouseEvent }) => {
  // stick origin data
  const origin = {
    width: options.origin.value.width,
    height: options.origin.value.height,
    mouseX: options.event.screenX,
    mouseY: options.event.screenY,
  }

  const limitLength = (
    to: number,
    min = options.min ?? 0,
    max?: number
  ): number => {
    if (to <= min) return min
    if (max && to >= max) return max
    return to
  }

  const stickMove = (event: MouseEvent) => {
    if (options.direction === 'right' || options.direction === 'left') {
      document.body.style.cursor = 'ew-resize'
      const deltaX =
        (options.direction === 'right' ? 1 : -1) *
        (event.screenX - origin.mouseX)
      options.onResizing({
        width: limitLength(origin.width! + deltaX, options.min, options.max),
      })
    } else {
      document.body.style.cursor = 'ns-resize'
      const deltaY =
        (options.direction === 'bottom' ? 1 : -1) *
        (event.screenY - origin.mouseY)

      options.onResizing({
        height: limitLength(origin.height! + deltaY, options.min, options.max),
      })
    }
  }
  const addStickMoveListener = () => {
    document.documentElement.addEventListener('mousemove', stickMove)
    document.documentElement.addEventListener('mouseup', stickUp)
    document.documentElement.addEventListener('mouseleave', stickUp)
  }
  const removeStickMoveListener = () => {
    document.body.style.cursor = 'default'
    document.documentElement.removeEventListener('mousemove', stickMove)
    document.documentElement.removeEventListener('mouseup', stickUp)
    document.documentElement.removeEventListener('mouseleave', stickUp)
  }
  const stickUp = removeStickMoveListener

  addStickMoveListener()
}
