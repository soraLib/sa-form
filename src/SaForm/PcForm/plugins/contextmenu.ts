import { SaPluginType } from '../../plugin'

export const ContextmenuPlugins = {
  'widget-contextmenu-binds': {
    label: 'binds',
    attr: 'contextmenu-binds',
    type: SaPluginType.Dialog,
    dialog: {
      component: 'widget-contextmenu-binds',
      title: 'Binds',
    },
    filter: (ids: string[]) => ids.join('; '),
  },
} as const
