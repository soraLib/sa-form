import { BasicGraph } from '../graph'
import { SaPlugin } from '../plugin'
import { isElementAttribute } from './element'

export function getPluginValue(graph: BasicGraph, plugin: SaPlugin) {
  const selected = graph.selected[0]
  if (!selected) return

  if (isElementAttribute(plugin.attr, selected)) {
    return selected.attrs[plugin.attr]
  }

  return
}