import { setObjectValues } from 'sugar-sajs'
import { ElementType } from '../../../../../../element'
import { BasicRecordType } from '../../../../../../record'
import { PcElement } from '../../../../../element'
import { PcGraph } from '../../../../../graph'
import { PcRecord } from '../../../../../record'
import { getSelectionRectangle } from '../../../utils'
import { sticks } from '../element-renderer'

interface MoveStatus {
  _mouseStartX: number
  _mouseStartY: number
  _elemStartX: number
  _elemStartY: number
}

/**
 * Drag element in graph.
 */
export const useElementDrag = (event: MouseEvent, element: PcElement, graph: PcGraph) => {
  if (!element.parent) return graph.setSelected() // skip resize canvas

  const status: MoveStatus = {
    _mouseStartX: 0,
    _mouseStartY: 0,
    _elemStartX: 0,
    _elemStartY: 0
  }

  event.stopPropagation()

  status._mouseStartX = event.screenX
  status._mouseStartY = event.screenY
  status._elemStartX = element.attrs.x
  status._elemStartY = element.attrs.y

  const MOVE_START_TIME = new Date()

  const moveCb = (event: MouseEvent) => {
    graph.setMouse({ x: event.screenX, y: event.screenY })
    elementMove(status, event)
  }

  document.addEventListener('mousemove', moveCb)
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', moveCb)
    elementMoveEnd(status, MOVE_START_TIME)
  }, { once: true })

  const elementMove = (status: MoveStatus, event: MouseEvent) => {
    graph.setSelected(element)
    graph.setDrag(true)

    // move distance
    const moveX = event.screenX - status._mouseStartX
    const moveY = event.screenY - status._mouseStartY

    const finalX = status._elemStartX + moveX
    const finalY = status._elemStartY + moveY

    // Limits the offset of the element to ensure its always inside the parent element.
    graph.updateElemData(element, {
      x: finalX < 0 ? 0
        : finalX + element.attrs.width > element.parent!.attrs.width
          ? element.parent!.attrs.width - element.attrs.width : finalX,
      y : finalY < 0 ? 0
        : finalY + element.attrs.height > element.parent!.attrs.height
          ? element.parent!.attrs.height - element.attrs.height : finalY
    }, false)
  }
  const elementMoveEnd = (status: MoveStatus, MOVE_START_TIME: Date) => {
    const MOVE_END_TIME = new Date()
    const duration = MOVE_END_TIME.getTime() - MOVE_START_TIME.getTime()
    const moveX = element.attrs.x - status._elemStartX
    const moveY = element.attrs.y - status._elemStartY

    // skip when not move
    if (moveX || moveY) {
      if (duration > 200) { // debounce
        graph.addRecord(new PcRecord({
          time: new Date(),
          type: BasicRecordType.Attr,
          data: [{
            id: element.attrs.id,
            name: element.attrs.name,
            prev: {
              x: status._elemStartX,
              y: status._elemStartY
            },
            next: {
              x: element.attrs.x,
              y: element.attrs.y
            }
          }]
        }))
      } else {
        graph.updateElemData(element, {
          x: status._elemStartX,
          y : status._elemStartY
        }, false)
      }
    }

    graph.setMouse()
    graph.setDrag(false)
    graph.setSelected(element)
  }
}

export const useElementStickReszie = (event: MouseEvent, stick: typeof sticks[number], element: PcElement, graph: PcGraph) => {
  // stick origin data
  const origin = {
    mouseX: 0,
    mouseY: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0
  }

  const stickDown = (event: MouseEvent) => {
    origin.mouseX = event.pageX
    origin.mouseY = event.pageY
    origin.width = element.attrs.width
    origin.height = element.attrs.height
    origin.x = element.attrs.x
    origin.y = element.attrs.y

    addStickMoveListener()
    event.stopPropagation()
  }
  const stickMove = (event: MouseEvent) => {
    const delta = {
      x: (origin.mouseX - event.pageX),
      y: (origin.mouseY - event.pageY)
    }

    switch (stick[0]) {
      case 'b':
        delta.y = -delta.y
        break

      case 't': {
        const nextOffsetY = origin.y - delta.y
        if (nextOffsetY < 0 || (!element.attrs.height && delta.y < 0)) {
          return
        }
        element.attrs.y = nextOffsetY

        break
      }

      case 'm':
        delta.y = 0
        break
    }

    switch (stick[1]) {
      case 'r':
        delta.x = -delta.x

        break

      case 'l': {
        const nextOffsetX = origin.x - delta.x
        if (nextOffsetX < 0 || (!element.attrs.width && delta.x < 0)) {
          return
        }
        element.attrs.x = nextOffsetX
        break
      }

      case 'm':
        delta.x = 0
        break
    }

    element.attrs.width = origin.width + delta.x
    element.attrs.height = origin.height + delta.y

    element.attrs.width = element.attrs.width < 0 ? 0 : element.attrs.width
    element.attrs.height = element.attrs.height < 0 ? 0 : element.attrs.height

    const maxWidth = element.parent!.attrs.width - element.attrs.x
    const maxHeight = element.parent!.attrs.height - element.attrs.y

    if (element.type === ElementType.Container && element.children?.length) {
      const rect = getSelectionRectangle(element.children)

      element.attrs.width = element.attrs.width > rect.width + rect.x ? element.attrs.width : rect.width + rect.x
      element.attrs.height = element.attrs.height > rect.height + rect.y ? element.attrs.height : rect.height + rect.y
    } else {
      element.attrs.width = element.attrs.width > maxWidth ? maxWidth : element.attrs.width
      element.attrs.height = element.attrs.height > maxHeight ? maxHeight : element.attrs.height
    }
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
          height: origin.height
        },
        next: {
          width: element.attrs.width,
          height: element.attrs.height
        }
      }]
    })

    graph.addRecord(record)
    setObjectValues(origin, {
      mouseX: 0,
      mouseY: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0
    })
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

  stickDown(event)
}