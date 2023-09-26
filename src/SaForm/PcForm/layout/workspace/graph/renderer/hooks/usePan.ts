import type { PcGraph } from '@/SaForm/PcForm/graph'
import { getScrollContainer } from '@/SaForm/utils/domUtils'

export const getStyle = function (
  element: HTMLElement,
  styleName: any
): string {
  if (!element || !styleName) {
    return ''
  }
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const style = element.style[styleName]
    if (style) {
      return style
    }
    const computed = document.defaultView?.getComputedStyle(element, '')

    return computed ? computed[styleName] : ''
  } catch {
    return element.style[styleName]
  }
}

export const isScroll = (
  el: HTMLElement,
  isVertical?: boolean
): RegExpMatchArray => {
  const determinedDirection = isVertical === null || isVertical === undefined
  const overflow = determinedDirection
    ? getStyle(el, 'overflow')
    : isVertical
    ? getStyle(el, 'overflow-y')
    : getStyle(el, 'overflow-x')

  return overflow.match(/(scroll|auto)/)!
}

const hasVerticalScrollbar = (element: HTMLElement) =>
  element.scrollHeight > element.clientHeight
const hasHorizontalScrollbar = (element: HTMLElement) =>
  element.scrollWidth > element.clientWidth
const hasScrollbar = (element: HTMLElement) =>
  hasVerticalScrollbar(element) || hasHorizontalScrollbar(element)

export const usePan = (event: MouseEvent, graph: PcGraph) => {
  if (!graph.canvas.el) return

  const scroller = getScrollContainer(graph.canvas.el) as HTMLElement
  if (!scroller) return
  const graphHasScrollbar = hasScrollbar(scroller)

  const pos = {
    left: scroller.scrollLeft,
    top: scroller.scrollTop,
    x: event.clientX,
    y: event.clientY,
  }

  const panMove = (event: MouseEvent) => {
    if (!graphHasScrollbar) return

    graph.setPanning(true)

    const dx = event.clientX - pos.x
    const dy = event.clientY - pos.y

    scroller.scrollTop = pos.top - dy
    scroller.scrollLeft = pos.left - dx
  }
  const panEnd = (event: MouseEvent) => {
    graph.setPanning(false)
    removePanListener()

    if (event.clientX === pos.x && event.clientY === pos.y) graph.setSelected()
  }

  const addPanListener = () => {
    document.documentElement.addEventListener('mousemove', panMove)
    document.documentElement.addEventListener('mouseup', panEnd)
    document.documentElement.addEventListener('mouseleave', panEnd)
  }
  const removePanListener = () => {
    document.documentElement.removeEventListener('mousemove', panMove)
    document.documentElement.removeEventListener('mouseup', panEnd)
    document.documentElement.removeEventListener('mouseleave', panEnd)
  }

  addPanListener()
}
