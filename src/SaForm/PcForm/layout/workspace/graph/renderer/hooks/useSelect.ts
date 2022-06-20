import { PcElement } from '../../../../../element'
import { PcGraph, SelectionBox } from '../../../../../graph'

interface SelectStatus {
  _mouseStartX: number
  _mouseStartY: number
  _startX: number
  _startY: number
}

export const useElementSelect = (event: MouseEvent, element: PcElement, graph: PcGraph) => {
  const status: SelectStatus = {
    _mouseStartX: event.screenX,
    _mouseStartY: event.screenY,
    _startX: event.offsetX,
    _startY: event.offsetY
  }

  const selectCb = elementSelect

  document.addEventListener('mousemove', selectCb)
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', selectCb)
    elementSelectEnd()
  }, { once: true })

  function elementSelect(event: MouseEvent) {
    graph.setSelected(element)
    graph.setSelect(true)

    let width = 0
    let height = 0
    let left = status._startX
    let top = status._startY

    // move distance
    const moveX = event.screenX - status._mouseStartX
    const moveY = event.screenY - status._mouseStartY

    if (moveX > 0 && moveY > 0) {
      width = status._startX + moveX > element.attrs.width ? element.attrs.width - status._startX : moveX
      height = status._startY + moveY > element.attrs.height ? element.attrs.height - status._startY : moveY
    }
    if (moveX > 0 && moveY < 0) {
      width = status._startX + moveX > element.attrs.width ? element.attrs.width - status._startX : moveX
      height = status._startY + moveY < 0 ? status._startY : Math.abs(moveY)

      top -= height
    }
    if (moveX < 0 && moveY > 0) {
      width = status._startX + moveX < 0 ? status._startX : Math.abs(moveX)
      height = status._startY + moveY > element.attrs.height ? element.attrs.height - status._startY : moveY

      left -= width
    }
    if (moveX < 0 && moveY < 0) {
      width = status._startX + moveX < 0 ? status._startX : Math.abs(moveX)
      height = status._startY + moveY < 0 ? status._startY : Math.abs(moveY)

      left -= width
      top -= height
    }

    graph.setSelectionBox({
      left,
      top,
      width,
      height
    })
  }
  function elementSelectEnd() {
    selectWithBox(graph.selectionBox, graph)
    graph.setSelect(false)
    graph.setSelectionBox()
  }
}

interface Rect {
  left: number
  top: number
  width: number
  height: number
}

/**
 * Returns the two rectangle whether is coincided.
 */
const isCoincide = (a: Rect, b: Rect): boolean =>
  !(
    a.left + a.width < b.left ||
    a.left > b.left + b.width ||
    a.top > b.top + b.height ||
    a.top + a.height < b.top
  )

const selectWithBox = (box: SelectionBox, graph: PcGraph) => {
  const selected = graph.selected[0]
  const compares = selected.parent?.children ?? selected.children

  const selections = compares?.length ? compares.reduce(
    (selections, cur) => isCoincide(
      box,
      {
        left: cur.attrs.x,
        top: cur.attrs.y,
        width: cur.attrs.width,
        height: cur.attrs.height
      }
    ) ? [...selections, cur] : selections
    , [] as PcElement[]) : []

  graph.setSelected(selections)
}

