import { last } from 'lodash-es'
import type { ElUpdateData, PcGraph } from '../graph'

export type ConnectTyle = 'horizontal' | 'vertical'

export const connectElements = (type: ConnectTyle, graph: PcGraph) => {
  if (graph.selected.length < 2) return
  const [head] = graph.selected

  switch (type) {
    case 'horizontal': {
      const sorted = [...graph.selected].sort((a, b) => a.attrs.x - b.attrs.x)
      const updates: ElUpdateData[] = sorted.reduce<ElUpdateData[]>(
        (acc, cur) => {
          const prev = last(acc)

          return [
            ...acc,
            {
              element: cur,
              data: {
                x: prev ? prev.data.x! + prev.element.attrs.width : cur.attrs.x,
              },
            },
          ]
        },
        []
      )
      const offset =
        head.attrs.x - updates.find(({ element }) => element === head)!.data.x!

      graph.updateElemsData(
        updates.reduce<ElUpdateData[]>((acc, cur) => {
          if (cur.element === head) return acc

          return [
            ...acc,
            {
              ...cur,
              data: {
                x: cur.data.x! + offset,
              },
            },
          ]
        }, [])
      )

      break
    }

    case 'vertical': {
      const sorted = [...graph.selected].sort((a, b) => a.attrs.y - b.attrs.y)
      const updates: ElUpdateData[] = sorted.reduce<ElUpdateData[]>(
        (acc, cur) => {
          const prev = last(acc)

          return [
            ...acc,
            {
              element: cur,
              data: {
                y: prev
                  ? prev.data.y! + prev.element.attrs.height
                  : cur.attrs.y,
              },
            },
          ]
        },
        []
      )
      const offset =
        head.attrs.y - updates.find(({ element }) => element === head)!.data.y!

      graph.updateElemsData(
        updates.reduce<ElUpdateData[]>((acc, cur) => {
          if (cur.element === head) return acc

          return [
            ...acc,
            {
              ...cur,
              data: {
                y: cur.data.y! + offset,
              },
            },
          ]
        }, [])
      )

      break
    }

    default:
      throw new Error(`unexpected equal type '${type}.`)
  }
}
