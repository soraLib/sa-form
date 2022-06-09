import { SaPluginType } from '../../plugin'

export const SelectPlugins = {
  'select-options': {
    label: 'options',
    attr: 'options',
    type: SaPluginType.Dialog,
    dialog: {
      component: 'widget-options',
      title: 'select-options'
    },
    disabled: true,
    filter: (value: { name: string }[]) => value.map(item => item.name).join(';')
  }
} as const