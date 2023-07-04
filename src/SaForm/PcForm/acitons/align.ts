import type { PcGraph } from '../graph'

export type AlignDirection =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'vertical-center'
  | 'horizontal-center'
export const alignElements = (direction: AlignDirection, graph: PcGraph) => {
  if (graph.selected.length < 2) return
  const [head, ...others] = graph.selected

  switch (direction) {
    case 'left': {
      const aligns = others.filter((other) => other.attrs.x !== head.attrs.x)
      if (!aligns.length) return

      graph.updateElemsData(
        aligns.map((elem) => ({
          element: elem,
          data: {
            x: head.attrs.x,
          },
        }))
      )

      break
    }

    case 'right': {
      const rightEdge = head.attrs.x + head.attrs.width
      const aligns = others.filter(
        (other) => other.attrs.x + other.attrs.width !== rightEdge
      )
      if (!aligns.length) return

      graph.updateElemsData(
        aligns.map((elem) => ({
          element: elem,
          data: {
            x: rightEdge - elem.attrs.width,
          },
        }))
      )

      break
    }

    case 'top': {
      const aligns = others.filter((other) => other.attrs.y !== head.attrs.y)
      if (!aligns.length) return

      graph.updateElemsData(
        aligns.map((elem) => ({
          element: elem,
          data: {
            y: head.attrs.y,
          },
        }))
      )

      break
    }

    case 'bottom': {
      const bottomEdge = head.attrs.y + head.attrs.height
      const aligns = others.filter(
        (other) => other.attrs.y + other.attrs.height !== bottomEdge
      )
      if (!aligns.length) return

      graph.updateElemsData(
        aligns.map((elem) => ({
          element: elem,
          data: {
            y: bottomEdge - elem.attrs.height,
          },
        }))
      )

      break
    }

    case 'vertical-center': {
      const vCenterEdge = head.attrs.y + head.attrs.height / 2
      const aligns = others.filter(
        (other) => other.attrs.y + other.attrs.height / 2 !== vCenterEdge
      )
      if (!aligns.length) return

      graph.updateElemsData(
        aligns.map((elem) => ({
          element: elem,
          data: {
            y: vCenterEdge - elem.attrs.height / 2,
          },
        }))
      )

      break
    }

    case 'horizontal-center': {
      const hCenterEdge = head.attrs.x + head.attrs.width / 2
      const aligns = others.filter(
        (other) => other.attrs.x + other.attrs.width !== hCenterEdge
      )
      if (!aligns.length) return

      graph.updateElemsData(
        aligns.map((elem) => ({
          element: elem,
          data: {
            x: hCenterEdge - elem.attrs.width / 2,
          },
        }))
      )

      break
    }

    default:
      throw new Error(`unexpected align direction '${direction}.`)
  }
}
