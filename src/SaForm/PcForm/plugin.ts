import { ElementType } from '../element'
import { BasicPlugins } from '../plugin'
import { SelectPlugins } from './plugins/select'
import type { SaPluginLayout } from '../plugin'
import type { PcGraph } from './graph'
import type { PcElementAttributes } from './element'

export const PcPlugin: SaPluginLayout = {
  [ElementType.Canvas]: {
    basic: [
      BasicPlugins['widget-id'],
      BasicPlugins['widget-name'],
      BasicPlugins['widget-background'],
      BasicPlugins['widget-size'],
    ],
  },
  [ElementType.Container]: {
    basic: [
      BasicPlugins['widget-id'],
      BasicPlugins['widget-name'],
      BasicPlugins['widget-background'],
      BasicPlugins['widget-size'],
      BasicPlugins['widget-position'],
    ],
  },
  [ElementType.Text]: {
    basic: [
      BasicPlugins['widget-id'],
      BasicPlugins['widget-name'],
      BasicPlugins['widget-background'],
      BasicPlugins['widget-size'],
      BasicPlugins['widget-position'],
    ],
  },
  [ElementType.Button]: {
    basic: [
      BasicPlugins['widget-id'],
      BasicPlugins['widget-name'],
      BasicPlugins['widget-background'],
      BasicPlugins['widget-size'],
      BasicPlugins['widget-position'],
    ],
  },
  [ElementType.Select]: {
    basic: [
      BasicPlugins['widget-id'],
      BasicPlugins['widget-name'],
      BasicPlugins['widget-background'],
      BasicPlugins['widget-size'],
      BasicPlugins['widget-position'],
      SelectPlugins['select-options'],
    ],
  },
}

export function pcPluginValueChange<T extends keyof PcElementAttributes>(
  key: T,
  value: PcElementAttributes[T],
  graph: PcGraph
) {
  const seleceted = graph.selected[0]

  if (!seleceted) return

  graph.updateElemData(seleceted, { [key]: value })
}
