import { SaPluginType } from '../../plugin'

export const RadioPlugins = {
  'widget-rows-x-columns': {
    label: 'rows-x-columns',
    collapsed: false,
    plugins: {
      'row-number': {
        label: 'row',
        title: 'row-number',
        attr: 'row-number',
        type: SaPluginType.Number,
      },
      'column-number': {
        label: 'column',
        title: 'column-number',
        attr: 'column-number',
        type: SaPluginType.Number,
      },
    },
  },
} as const
