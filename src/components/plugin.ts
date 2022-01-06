import { ElementType } from "./element";

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
  },
  'widget-width': {
    label: 'width',
    attr: 'width',
    component: SaPluginType.Number
  },
  'widget-height': {
    label: 'height',
    attr: 'height',
    component: SaPluginType.Number
  },
  'widget-offsetX': {
    label: 'x',
    attr: 'offsetX',
    component: SaPluginType.Number
  },
  'widget-offsetY': {
    label: 'y',
    attr: 'offsetY',
    component: SaPluginType.Number
  }
} as const;


export type SaPluginLayout = {
  [key in ElementType]?: {
    basic?: SaPlugin[];
    extend?: SaPlugin[];
  }
}