import { ElementType } from '../element'
import { BasicPlugins } from '../plugin'
import { SelectPlugins } from './plugins/select'
import type { SaPluginLayout } from '../plugin'
import type { PcGraph } from './graph'
import type { PcElementAttributes } from './element'

const basicPlugins = [
  BasicPlugins['widget-id'],
  BasicPlugins['widget-name'],
  BasicPlugins['widget-background'],
  BasicPlugins['widget-size'],
  BasicPlugins['widget-position'],
]

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
    basic: [...basicPlugins],
  },
  [ElementType.Text]: {
    basic: [...basicPlugins],
  },
  [ElementType.Input]: {
    basic: [...basicPlugins],
  },
  [ElementType.Textarea]: {
    basic: [...basicPlugins],
  },
  [ElementType.Button]: {
    basic: [...basicPlugins],
  },
  [ElementType.Radio]: {
    basic: [...basicPlugins],
  },
  [ElementType.Checkbox]: {
    basic: [...basicPlugins],
  },
  [ElementType.Select]: {
    basic: [...basicPlugins, SelectPlugins['select-options']],
  },
  [ElementType.Table]: {
    basic: [...basicPlugins],
  },
  [ElementType.Image]: {
    basic: [...basicPlugins],
  },
  [ElementType.Tab]: {
    basic: [...basicPlugins],
  },
  [ElementType.Calendar]: {
    basic: [...basicPlugins],
  },
  [ElementType.Contextmenu]: {
    basic: [...basicPlugins],
  },
  [ElementType.Tree]: {
    basic: [...basicPlugins],
  },
  [ElementType.Map]: {
    basic: [...basicPlugins],
  },
  [ElementType.Chart]: {
    basic: [...basicPlugins],
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
