import { BasicRecordType } from '../../../../../../record'
import { PcRecord } from '../../../../../record'
import { getRectangle } from '../utils/rectangle'
import { gridFloor } from './utils'
import type { PcGraph } from '../../../../../graph'
import type { PcElement } from '../../../../../element'

export const aheadSelected = (element: PcElement, graph: PcGraph) => {
  return graph.setSelected([
    element,
    ...graph.selected.filter((ele) => ele !== element),
  ])
}

/** select element or take it at the ahead of the selected */
export const selectOrAhead = (element: PcElement, graph: PcGraph) => {
  const find = graph.selected.find((ele) => ele === element)

  if (find) {
    return aheadSelected(element, graph)
  }

  return graph.setSelected([element])
}

interface DragPositon {
  _startX: number
  _startY: number
}

export const useElementDrag = (
  event: MouseEvent,
  element: PcElement,
  graph: PcGraph
) => {
  selectOrAhead(element, graph)
  const rect = getRectangle(graph.selected)

  const mousePos: DragPositon = {
    _startX: event.screenX,
    _startY: event.screenY,
  }
  const rectPos: DragPositon = {
    _startX: rect.x,
    _startY: rect.y,
  }
  const elemsPos: DragPositon[] = graph.selected.map((ele) => ({
    _startX: ele.attrs.x,
    _startY: ele.attrs.y,
  }))

  const MOVE_START_TIME = new Date()

  const moveCb = (event: MouseEvent) => {
    graph.setMouse({ x: event.screenX, y: event.screenY })
    elementMove(event)
  }

  document.addEventListener('mousemove', moveCb)
  document.addEventListener(
    'mouseup',
    () => {
      document.removeEventListener('mousemove', moveCb)
      elementMoveEnd()
    },
    { once: true }
  )

  const elementMove = (event: MouseEvent) => {
    graph.setDragging(true)

    // move distance
    let moveX = event.screenX - mousePos._startX
    let moveY = event.screenY - mousePos._startY

    // grid
    if (graph.grid.enabled) {
      moveX = gridFloor(rect.x + moveX, graph.grid.size) - rect.x
      moveY = gridFloor(rect.y + moveY, graph.grid.size) - rect.y
    }

    const finalX = rectPos._startX + moveX
    const finalY = rectPos._startY + moveY

    // TODO: try to integrate into `graph.move`
    // limits the offset of the elements to ensure its always inside the parent.
    const finalMoveX =
      finalX + rect.width > element.parent!.attrs.width
        ? element.parent!.attrs.width - rect.width - rectPos._startX
        : finalX < 0
        ? -rectPos._startX
        : moveX
    const finalMoveY =
      finalY + rect.height > element.parent!.attrs.height
        ? element.parent!.attrs.height - rect.height - rectPos._startY
        : finalY < 0
        ? -rectPos._startY
        : moveY

    graph.updateElemsData(
      graph.selected.map((ele, i) => {
        const x = elemsPos[i]._startX + finalMoveX
        const y = elemsPos[i]._startY + finalMoveY

        return {
          element: ele,
          data: {
            x,
            y,
          },
        }
      }),
      false
    )
  }
  const elementMoveEnd = () => {
    const MOVE_END_TIME = new Date()
    const duration = MOVE_END_TIME.getTime() - MOVE_START_TIME.getTime()
    const rect = getRectangle(graph.selected)

    const moveX = rect.x - rectPos._startX
    const moveY = rect.y - rectPos._startY

    // skip when not move
    if (moveX || moveY) {
      if (duration > 200) {
        // debounce
        graph.addRecord(
          new PcRecord({
            time: new Date(),
            type: BasicRecordType.Attr,
            data: graph.selected.map((ele, i) => ({
              id: ele.attrs.id,
              name: ele.attrs.name,
              prev: {
                x: elemsPos[i]._startX,
                y: elemsPos[i]._startY,
              },
              next: {
                x: ele.attrs.x,
                y: ele.attrs.y,
              },
            })),
          })
        )
      } else {
        graph.updateElemsData(
          graph.selected.map((ele, i) => ({
            element: ele,
            data: {
              x: elemsPos[i]._startX,
              y: elemsPos[i]._startY,
            },
          }))
        )
      }
    } else {
      graph.setSelected(element)
    }

    graph.setDragging(false)
    graph.setMouse()
  }
}
