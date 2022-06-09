import { ElementType } from '../element'
import { BasicPlugins, SaPluginLayout } from '../plugin'
import { PcGraph } from './graph'
import { PcElementAttributes } from './element'
import { SelectPlugins } from './plugins/select'

export const PcPlugin: SaPluginLayout = {
  [ElementType.Canvas]: {
    basic: [
      BasicPlugins['widget-id'],
      BasicPlugins['widget-name'],
      BasicPlugins['widget-width'],
      BasicPlugins['widget-height']
    ]
  },
  [ElementType.Container]: {
    basic: [
      BasicPlugins['widget-id'],
      BasicPlugins['widget-name'],
      BasicPlugins['widget-width'],
      BasicPlugins['widget-height'],
      BasicPlugins['widget-x'],
      BasicPlugins['widget-y'],
      BasicPlugins['widget-background']
    ]
  },
  [ElementType.Button]: {
    basic: [
      BasicPlugins['widget-id'],
      BasicPlugins['widget-name'],
      BasicPlugins['widget-width'],
      BasicPlugins['widget-height'],
      BasicPlugins['widget-x'],
      BasicPlugins['widget-y'],
      BasicPlugins['widget-background']
    ]
  },
  [ElementType.Select]: {
    basic: [
      BasicPlugins['widget-id'],
      BasicPlugins['widget-name'],
      BasicPlugins['widget-width'],
      BasicPlugins['widget-height'],
      BasicPlugins['widget-x'],
      BasicPlugins['widget-y'],
      SelectPlugins['select-options']
    ]
  }
}

export function pcPluginValueChange<T extends keyof PcElementAttributes>(key: T, value: PcElementAttributes[T], graph: PcGraph) {
  const seleceted = graph.selected[0]

  if (!seleceted) return

  graph.updateElemData(seleceted, { [key]: value })
}