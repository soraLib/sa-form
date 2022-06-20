import { BasicRecordType } from '../../../../../../record'
import { PcElement } from '../../../../../element'
import { PcGraph } from '../../../../../graph'
import { PcRecord } from '../../../../../record'
import { useElementSelect } from './useSelect'

interface DragStatus {
  _mouseStartX: number
  _mouseStartY: number
  _elemStartX: number
  _elemStartY: number
}

const useElementDrag = (event: MouseEvent, element: PcElement, graph: PcGraph) => {
  const status: DragStatus = {
    _mouseStartX: event.screenX,
    _mouseStartY: event.screenY,
    _elemStartX: element.attrs.x,
    _elemStartY: element.attrs.y
  }

  const MOVE_START_TIME = new Date()

  const moveCb = (event: MouseEvent) => {
    graph.setMouse({ x: event.screenX, y: event.screenY })
    elementMove(event)
  }

  document.addEventListener('mousemove', moveCb)
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', moveCb)
    elementMoveEnd()
  }, { once: true })

  const elementMove = (event: MouseEvent) => {
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
  const elementMoveEnd = () => {
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

    graph.setDrag(false)
    graph.setMouse()
    graph.setSelected(element)
  }
}

/**
 * OnMousedown element handler.
 */
export const useElementHandler = (event: MouseEvent, element: PcElement, graph: PcGraph) => {
  event.stopPropagation()

  if (!element.parent) { // canvas
    useElementSelect(event, element, graph)
  } else {
    useElementDrag(event, element, graph)
  }
}