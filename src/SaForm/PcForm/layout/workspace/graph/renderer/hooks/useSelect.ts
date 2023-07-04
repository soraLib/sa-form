import type { PcElement } from '../../../../../element'
import type { PcGraph, SelectionBox } from '../../../../../graph'
import type { Rect } from '../utils/rectangle'

interface SelectStatus {
  _mouseStartX: number
  _mouseStartY: number
  _startX: number
  _startY: number
}

export const useElementSelect = (
  event: MouseEvent,
  element: PcElement,
  graph: PcGraph
) => {
  const status: SelectStatus = {
    _mouseStartX: event.screenX,
    _mouseStartY: event.screenY,
    _startX: event.offsetX,
    _startY: event.offsetY,
  }

  const selectCb = elementSelect

  document.addEventListener('mousemove', selectCb)
  document.addEventListener(
    'mouseup',
    () => {
      document.removeEventListener('mousemove', selectCb)
      elementSelectEnd()
    },
    { once: true }
  )

  function elementSelect(event: MouseEvent) {
    graph.setSelected(element)
    graph.setSelect(true)

    let width = 0
    let height = 0
    let x = status._startX
    let y = status._startY

    // move distance
    const moveX = event.screenX - status._mouseStartX
    const moveY = event.screenY - status._mouseStartY

    if (moveX > 0 && moveY > 0) {
      width =
        status._startX + moveX > element.attrs.width
          ? element.attrs.width - status._startX
          : moveX
      height =
        status._startY + moveY > element.attrs.height
          ? element.attrs.height - status._startY
          : moveY
    }
    if (moveX > 0 && moveY < 0) {
      width =
        status._startX + moveX > element.attrs.width
          ? element.attrs.width - status._startX
          : moveX
      height = status._startY + moveY < 0 ? status._startY : Math.abs(moveY)

      y -= height
    }
    if (moveX < 0 && moveY > 0) {
      width = status._startX + moveX < 0 ? status._startX : Math.abs(moveX)
      height =
        status._startY + moveY > element.attrs.height
          ? element.attrs.height - status._startY
          : moveY

      x -= width
    }
    if (moveX < 0 && moveY < 0) {
      width = status._startX + moveX < 0 ? status._startX : Math.abs(moveX)
      height = status._startY + moveY < 0 ? status._startY : Math.abs(moveY)

      x -= width
      y -= height
    }

    graph.setSelectionBox({
      x,
      y,
      width,
      height,
    })
  }
  function elementSelectEnd() {
    selectWithBox(graph.selectionBox, graph)
    graph.setSelect(false)
    graph.setSelectionBox()
  }
}

/**
 * Returns the two rectangle whether is coincided.
 */
const isCoincide = (a: Rect, b: Rect): boolean =>
  !(
    a.x + a.width < b.x ||
    a.x > b.x + b.width ||
    a.y > b.y + b.height ||
    a.y + a.height < b.y
  )

const selectWithBox = (box: SelectionBox, graph: PcGraph) => {
  const selected = graph.selected[0]
  const compares = selected.parent?.children ?? selected.children

  const selections = compares?.length
    ? compares.reduce(
        (selections, cur) =>
          isCoincide(box, {
            x: cur.attrs.x,
            y: cur.attrs.y,
            width: cur.attrs.width,
            height: cur.attrs.height,
          })
            ? [...selections, cur]
            : selections,
        [] as PcElement[]
      )
    : []

  graph.setSelected(selections)
}
