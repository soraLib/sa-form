import { SaPluginType } from '../../Plugin';

export const SelectPlugins = {
  'select-options': {
    label: 'options',
    attr: 'options',
    type: SaPluginType.Dialog,
    dialog: 'widget-options',
    disabled: true
  }
} as const;