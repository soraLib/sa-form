import type { ElementType } from './element'

/** property controller type */
export enum SaPluginType {
  Input = 'input',
  Number = 'number',
  Select = 'select',
  Dialog = 'dialog',
  Color = 'color',
  Cascader = 'cascader',
}

export interface SaPlugin {
  /** plugin label */
  label: string
  /** plugin attribute, related to element's attr */
  attr: string
  /** plugin display type */
  type: SaPluginType
  /** plugin full name, used on DOM's title */
  title?: string
  /** dialog component settings, needed when SaPlugin type is `Dialog` */
  dialog?: {
    /** component name */
    component: string
    /** dialog title, set plugin label in default */
    title?: string
  }
  /** value filter for display format data */
  filter?: (value: any) => string
  /** plugin disable option */
  disabled?: boolean
}

export const BasicPlugins = {
  'widget-id': {
    label: 'id',
    attr: 'id',
    type: SaPluginType.Input,
    disabled: true,
  },
  'widget-name': {
    label: 'name',
    attr: 'name',
    type: SaPluginType.Input,
  },
  'widget-width': {
    label: 'width',
    attr: 'width',
    type: SaPluginType.Number,
  },
  'widget-height': {
    label: 'height',
    attr: 'height',
    type: SaPluginType.Number,
  },
  'widget-x': {
    label: 'x',
    attr: 'x',
    type: SaPluginType.Number,
  },
  'widget-y': {
    label: 'y',
    attr: 'y',
    type: SaPluginType.Number,
  },
  'widget-background': {
    label: 'BGD',
    title: 'background',
    attr: 'background',
    type: SaPluginType.Color,
  },
} as const

export type SaPluginLayout = {
  [key in ElementType]?: {
    basic?: SaPlugin[]
    extend?: SaPlugin[]
  }
}
