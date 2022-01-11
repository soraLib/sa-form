import { ElementType } from './element';

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
  /** plugin label */
  label: string;
  /** plugin attribute, related to element's attr */
  attr: string;
  /** plugin display type */
  type: SaPluginType;
  /** dialog component name, needed when SaPlugin type is `Dialog` */
  dialog?: string;
  /** plugin disable option */
  disabled?: boolean;
}

export const BasicPlugins = {
  'widget-id': {
    label: 'id',
    attr: 'id',
    type: SaPluginType.Input,
    disabled: true
  },
  'widget-name': {
    label: 'name',
    attr: 'name',
    type: SaPluginType.Input
  },
  'widget-width': {
    label: 'width',
    attr: 'width',
    type: SaPluginType.Number
  },
  'widget-height': {
    label: 'height',
    attr: 'height',
    type: SaPluginType.Number
  },
  'widget-offsetX': {
    label: 'x',
    attr: 'offsetX',
    type: SaPluginType.Number
  },
  'widget-offsetY': {
    label: 'y',
    attr: 'offsetY',
    type: SaPluginType.Number
  }
} as const;

export type SaPluginLayout = {
  [key in ElementType]?: {
    basic?: SaPlugin[];
    extend?: SaPlugin[];
  }
}