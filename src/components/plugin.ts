/** property controller type */
export enum SaPluginType {
  Input = 'input',
  Number = 'number',
  Select = 'select',
  Dialog = 'dialog',
  Color = 'color',
  Cascader = 'cascader'
}

export interface SaPlugin {
  label: string;
  attr: string;
  component: SaPluginType;
  disabled?: boolean;
}

export const BasicPlugins = {
  'widget-id': {
    label: 'id',
    attr: 'id',
    component: SaPluginType.Input,
    disabled: true
  },
  'widget-name': {
    label: 'name',
    attr: 'name',
    component: SaPluginType.Input
  }
} as const;

export interface SaPluginLayout {
  basic?: SaPlugin[];
  extend?: SaPlugin[];
}