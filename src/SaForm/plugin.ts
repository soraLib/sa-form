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
export interface SaPluginBasic {
  /** plugin label */
  label: string
  /** plugin full name, used on DOM's title */
  title?: string
}
export interface SaPlugin extends SaPluginBasic {
  attr: string
  /** plugin display type */
  type: SaPluginType
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
export interface SaGroupPlugin extends SaPluginBasic {
  /** group collapsed, default is `true` */
  collapsed?: boolean
  plugins: Record<string, SaPlugin>
}
export type SaPluginCombination = SaPlugin | SaGroupPlugin

export const isGroupPlugin = (
  plugin: SaPluginCombination
): plugin is SaGroupPlugin => (plugin as any).plugins

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

  'widget-size': {
    label: 'size',
    collapsed: false,
    plugins: {
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
    },
  },
  'widget-position': {
    label: 'position',
    collapsed: false,
    plugins: {
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
    },
  },
  'widget-background': {
    label: 'BGD',
    title: 'background',
    attr: 'background',
    type: SaPluginType.Color,
  },
} as const

export type SaPluginLayout = {
  [key in ElementType]: {
    /** basic property plugins */
    basic?: SaPluginCombination[]
    extend?: SaPluginCombination[]
  }
}
