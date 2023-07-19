import { useEventListener } from '@vueuse/core'
import { setDataTransfer } from '../../utils/stencil'
import type { StencilAttrs } from '.'

export namespace Stencil {
  export const updatePosition = (target: HTMLElement, evt: MouseEvent) => {
    target.style.left = `${evt.clientX}px`
    target.style.top = `${evt.clientY}px`
  }
  export const start = (attrs: StencilAttrs, evt: DragEvent) => {
    setDataTransfer(evt, 'effectAllowed', 'copy', false)
    evt.dataTransfer?.setData('element', JSON.stringify(attrs))

    const ghost = createGhostElement(attrs)
    evt.dataTransfer?.setDragImage(ghost, attrs.width / 2, attrs.height / 2)

    const cleanupUp = useEventListener('mouseup', () => {
      document.body.removeChild(ghost)
      cleanupUp()
    })
  }
}

export const createGhostElement = (attrs: StencilAttrs) => {
  const ghost = document.createElement('div')
  ghost.classList.add('drag-ghost')

  ghost.style.cssText = `
    width: ${attrs.width}px;
    height: ${attrs.height}px;
    border: 1px solid var(--c-brand);
    position: absolute;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  `

  ghost.innerHTML = attrs.name

  document.body.appendChild(ghost)

  return ghost
}
