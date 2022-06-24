import { ElementType } from '../../../../../../element'
import { BasicRecordType } from '../../../../../../record'
import { PcElement } from '../../../../../element'
import { PcGraph, Stick } from '../../../../../graph'
import { PcRecord } from '../../../../../record'
import { getRectangle } from '../utils/rectangle'

export const useElementStickReszie = (event: MouseEvent, stick: Stick, element: PcElement, graph: PcGraph) => {
  event.stopPropagation()
  graph.setResizeStick(stick)

  // stick origin data
  const origin = {
    mouseX: event.screenX,
    mouseY: event.screenY,
    width: element.attrs.width,
    height: element.attrs.height,
    x: element.attrs.x,
    y: element.attrs.y
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

    const maxWidth = element.parent!.attrs.width - x
    const maxHeight = element.parent!.attrs.height - y
    width = width > maxWidth ? maxWidth : width
    height = height > maxHeight ? maxHeight : height

    graph.updateElemData(element, {
      x,
      y,
      width,
      height
    }, false)
  }
  const stickUp = () => {
    const record = new PcRecord({
      time: new Date(),
      type: BasicRecordType.Attr,
      data: [{
        id: element.attrs.id,
        name: element.attrs.name,
        prev: {
          width: origin.width,
          height: origin.height,
          x: origin.x,
          y: origin.y
        },
        next: {
          width: element.attrs.width,
          height: element.attrs.height,
          x: element.attrs.x,
          y: element.attrs.y
        }
      }]
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