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
  disabled: boolean;
}

export const BasicPlugins = {
  'ctrl-name': {
    label: 'id',
    attr: 'id',
    component: SaPluginType.Input,
    disabled: true
  }
} as const;

export interface SaPluginLayout {
  basic?: SaPlugin[];
  extend?: SaPlugin[];
}