import type { PcGraph } from '@/SaForm/PcForm/graph'

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

export const getScrollContainer = (
  el: HTMLElement,
  isVertical?: boolean
): undefined | HTMLElement => {
  let parent: HTMLElement = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return undefined
    }
    if (isScroll(parent, isVertical)) {
      return parent
    }
    parent = parent.parentNode as HTMLElement
  }

  return parent
}

export const usePan = (event: MouseEvent, graph: PcGraph) => {
  if (!graph.canvas.el) return

  const scroller = getScrollContainer(graph.canvas.el) as HTMLElement
  if (!scroller) return

  graph.setPanning(true)

  const pos = {
    left: scroller.scrollLeft,
    top: scroller.scrollTop,
    x: event.clientX,
    y: event.clientY,
  }

  const panMove = (event: MouseEvent) => {
    const dx = event.clientX - pos.x
    const dy = event.clientY - pos.y

    scroller.scrollTop = pos.top - dy
    scroller.scrollLeft = pos.left - dx
  }
  const panEnd = () => {
    graph.setPanning(false)
    removePanListener()
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
