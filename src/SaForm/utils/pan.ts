import { useMagicKeys, useToggle } from '@vueuse/core'
import { getScrollContainer, hasScrollbar } from './domUtils'
import type { BasicGraph } from '../graph'

export const usePanning = () => {
  const { space } = useMagicKeys()
  const [isPanning, toggleIsPanning] = useToggle(false)

  const executePanning = <A extends BasicGraph>(
    event: MouseEvent,
    graph: A
  ) => {
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

      toggleIsPanning(true)

      const dx = event.clientX - pos.x
      const dy = event.clientY - pos.y

      scroller.scrollTop = pos.top - dy
      scroller.scrollLeft = pos.left - dx
    }
    const panEnd = () => {
      toggleIsPanning(false)
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

  return {
    isPressSpace: space,
    isPanning,
    executePanning,
  }
}
