import { isElementAttribute } from './element'
import type { BasicGraph } from '../graph'
import type { SaPlugin } from '../plugin'

export function getPluginValue(graph: BasicGraph, plugin: SaPlugin) {
  const selected = graph.selected[0]
  if (!selected) return

  if (isElementAttribute(plugin.attr, selected)) {
    return selected.attrs[plugin.attr]
  }

  return
}
