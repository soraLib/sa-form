import type { BasicElement } from '@/SaForm/element'
import type { BasicGraph } from '@/SaForm/graph'
import type { SaPlugin } from '@/SaForm/plugin'

export const pluginValueFilter = <A, B = any>(
  value: A,
  plugin: SaPlugin,
  element: BasicElement,
  graph: BasicGraph
): B => {
  const $value: any = plugin.filter
    ? plugin.filter(value, element, graph)
    : value

  return $value
}
