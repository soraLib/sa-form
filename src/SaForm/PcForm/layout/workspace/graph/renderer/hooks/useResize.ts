import { BasicRecordType } from '../../../../../../record'
import { PcRecord } from '../../../../../record'
import { getRectangle } from '../utils/rectangle'
import { useResizeOnGird } from './utils'
import type { PcGraph, Stick } from '../../../../../graph'
import type { PcElement } from '../../../../../element'

export const useElementStickReszie = (
  event: MouseEvent,
  stick: Stick,
  element: PcElement,
  graph: PcGraph
) => {
  const parent = element.parent
  if (!parent) return

  event.stopPropagation()
  graph.setResizeStick(stick)

  // stick origin data
  const origin = {
    mouseX: event.screenX,
    mouseY: event.screenY,
    width: element.attrs.width,
    height: element.attrs.height,
    x: element.attrs.x,
    y: element.attrs.y,
  }

  const stickMove = (event: MouseEvent) => {
    graph.setResizing(true)
    graph.setMouse({ x: event.screenX, y: event.screenY })

    let deltaX = event.screenX - origin.mouseX
    let deltaY = event.screenY - origin.mouseY
    let x = origin.x
    let y = origin.y

    const rect = getRectangle(element.children ?? [])
    const rectWidth = rect.x + rect.width
    const rectHeight = rect.y + rect.height

    const limitDeltaY = (deltaY: number): number => {
      if (origin.height + deltaY - rectHeight < 0 && deltaY < 0) {
        deltaY = rectHeight - origin.height
      }

      return deltaY
    }
    const limitDeltaX = (deltaX: number): number => {
      if (origin.width + deltaX - rectWidth < 0 && deltaX < 0) {
        deltaX = rectWidth - origin.width
      }

      return deltaX
    }

    switch (stick[0]) {
      case 'b': {
        deltaY = limitDeltaY(deltaY)
        break
      }

      case 't': {
        deltaY = -deltaY
        deltaY = limitDeltaY(deltaY)
        if (origin.y - deltaY < 0) {
          deltaY = origin.y
        }
        y -= deltaY
        break
      }

      case 'm': {
        deltaY = 0
        break
      }
    }

    switch (stick[1]) {
      case 'r': {
        deltaX = limitDeltaX(deltaX)
        break
      }

      case 'l': {
        deltaX = -deltaX
        deltaX = limitDeltaX(deltaX)
        if (origin.x - deltaX < 0) {
          deltaX = origin.x
        }
        x -= deltaX
        break
      }

      case 'm':
        deltaX = 0
        break
    }

    let width = origin.width + deltaX
    let height = origin.height + deltaY

    const parentBorderLength = (parent.attrs['border-width'] ?? 0) * 2
    const parentWidth = parent.attrs.width - parentBorderLength
    const parentHeight =
      parent.attrs.height -
      (parent.attrs['tab-height'] ?? 0) -
      parentBorderLength

    const maxWidth = parentWidth - x
    const maxHeight = parentHeight - y
    width = width > maxWidth ? maxWidth : width
    height = height > maxHeight ? maxHeight : height

    // grid
    if (graph.grid.enabled) {
      const rect = useResizeOnGird(
        { x, y, width, height },
        graph.grid.size,
        stick,
        {
          x: deltaX,
          y: deltaY,
        }
      )
      x = rect.x
      y = rect.y
      const rectMaxWidth = parentWidth - x
      const rectMaxHeight = parentHeight - y
      width = rect.width > rectMaxWidth ? rectMaxWidth : rect.width
      height = rect.height > rectMaxHeight ? rectMaxHeight : rect.height
    }

    graph.updateElemData(
      element,
      {
        x,
        y,
        width,
        height,
      },
      false
    )
  }
  const stickUp = () => {
    const record = new PcRecord({
      type: BasicRecordType.Attr,
      data: [
        {
          id: element.attrs.id,
          name: element.attrs.name,
          prev: {
            width: origin.width,
            height: origin.height,
            x: origin.x,
            y: origin.y,
          },
          next: {
            width: element.attrs.width,
            height: element.attrs.height,
            x: element.attrs.x,
            y: element.attrs.y,
          },
        },
      ],
    })

    graph.addRecord(record)
    graph.setResizing(false)
    graph.setResizeStick()
    removeStickMoveListener()
  }
  const addStickMoveListener = () => {
    document.documentElement.addEventListener('mousemove', stickMove)
    document.documentElement.addEventListener('mouseup', stickUp)
    document.documentElement.addEventListener('mouseleave', stickUp)
  }
  const removeStickMoveListener = () => {
    document.documentElement.removeEventListener('mousemove', stickMove)
    document.documentElement.removeEventListener('mouseup', stickUp)
    document.documentElement.removeEventListener('mouseleave', stickUp)
  }

  addStickMoveListener()
}
