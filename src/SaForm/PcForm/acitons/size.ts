import type { PcGraph } from '../graph'

export type EqualType = 'width' | 'height' | 'size'

export const equalElementsSize = (type: EqualType, graph: PcGraph) => {
  if (graph.selected.length < 2) return
  const [head, ...others] = graph.selected

  switch (type) {
    case 'width': {
      const equals = others.filter(
        (other) => other.attrs.width !== head.attrs.width
      )
      if (!equals.length) return

      graph.updateElemsData(
        equals.map((elem) => ({
          element: elem,
          data: {
            width: head.attrs.width,
          },
        }))
      )

      break
    }

    case 'height': {
      const equals = others.filter(
        (other) => other.attrs.height !== head.attrs.height
      )
      if (!equals.length) return

      graph.updateElemsData(
        equals.map((elem) => ({
          element: elem,
          data: {
            height: head.attrs.height,
          },
        }))
      )

      break
    }

    case 'size': {
      const equals = others.filter(
        (other) =>
          other.attrs.width !== head.attrs.width ||
          other.attrs.height !== head.attrs.height
      )
      if (!equals.length) return

      graph.updateElemsData(
        equals.map((elem) => ({
          element: elem,
          data: {
            width: head.attrs.width,
            height: head.attrs.height,
          },
        }))
      )

      break
    }

    default:
      throw new Error(`unexpected equal type '${type}.`)
  }
}
