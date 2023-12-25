import { getRectangle } from '../utils/rectangle'
import { gridCeil, gridFloor } from './utils'
import type { PcGraph } from '@/SaForm/PcForm/graph'
import type { PcElement } from '@/SaForm/PcForm/element'
import { PcRecord } from '@/SaForm/PcForm/record'
import { BasicRecordType } from '@/SaForm/record'

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
  const parent = element.parent
  if (!parent) return

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

  let lastMouse: { x: number; y: number } | null = null

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
    const moveX = event.screenX - mousePos._startX
    const moveY = event.screenY - mousePos._startY

    let finalX = rectPos._startX + moveX
    let finalY = rectPos._startY + moveY

    // grid
    if (graph.grid.enabled) {
      const moveToRight = lastMouse
        ? event.screenX > lastMouse.x
        : event.screenX > mousePos._startX
      if (moveToRight) {
        const lineX = gridCeil(finalX + rect.width, graph.grid.size)

        if (lineX - rect.width - finalX < graph.grid.radius) {
          finalX = lineX - rect.width
        }
      } else {
        const lineX = gridFloor(finalX, graph.grid.size)

        if (Math.abs(finalX - lineX) < graph.grid.radius) {
          finalX = lineX
        }
      }

      const moveToBottom = lastMouse
        ? event.screenY > lastMouse.y
        : event.screenY > mousePos._startY
      if (moveToBottom) {
        const lineY = gridCeil(finalY + rect.height, graph.grid.size)

        if (lineY - rect.height - finalY < graph.grid.radius) {
          finalY = lineY - rect.height
        }
      } else {
        const lineY = gridFloor(finalY, graph.grid.size)

        if (Math.abs(finalY - lineY) < graph.grid.radius) {
          finalY = lineY
        }
      }
    }

    const parentBorderLength = (parent.attrs['border-width'] ?? 0) * 2
    const parentWidth = parent.attrs.width - parentBorderLength
    const parentHeight =
      parent.attrs.height -
      (parent.attrs['tab-height'] ?? 0) -
      parentBorderLength

    // TODO: try to integrate into `graph.move`
    // limits the offset of the elements to ensure its always inside the parent.
    const finalMoveX =
      finalX + rect.width > parentWidth
        ? parentWidth - rect.width - rectPos._startX
        : finalX < 0
        ? -rectPos._startX
        : finalX - rectPos._startX
    const finalMoveY =
      finalY + rect.height > parentHeight
        ? parentHeight - rect.height - rectPos._startY
        : finalY < 0
        ? -rectPos._startY
        : finalY - rectPos._startY

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

    lastMouse = { x: event.screenX, y: event.screenY }
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
          })),
          false
        )
      }
    } else {
      graph.setSelected(element)
    }

    graph.setDragging(false)
    graph.setMouse()
  }
}
