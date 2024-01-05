import type { BasicGraph } from './graph'
import type { BasicElement, ElementType } from './element'

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
export type SaPluginOption = {
  label: string
  value: any
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
    /** default is `center` */
    position?: 'center' | 'bottom-right'
  }
  /** plugin component */
  component?: string
  /** options for `Select` */
  options?: SaPluginOption[]
  /** value filter for display format data */
  filter?: (value: any, element: BasicElement, graph: BasicGraph) => string
  /** plugin visiable option */
  visiable?: (value: any) => Promise<boolean> | boolean
  /** plugin disable option */
  disabled?: boolean | ((a: any) => boolean)
  /** plugin displayed option */
  hidden?: boolean | ((a: any, graph: BasicGraph) => boolean)
  /** displayed inline, only works in `SaGroupPlugin` */
  inline?: boolean
  filterable?: boolean
  clearable?: boolean
  /** default value if value is undefined */
  default?: any
  /** show button on input number, default is `true` */
  showButton?: boolean
  /** range for input number  */
  min?: number
  max?: number
  /** prefix for input */
  prefix?: string
  /** suffix for input */
  suffix?: string
  /** limit input format */
  allowInput?: (a: any) => boolean
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
  'widget-border': {
    label: 'border',
    collapsed: false,
    plugins: {
      'border-width': {
        label: 'width',
        attr: 'border-width',
        type: SaPluginType.Number,
      },
      'border-radius': {
        label: 'radius',
        attr: 'border-radius',
        type: SaPluginType.Number,
      },
      'border-style': {
        label: 'style',
        attr: 'border-style',
        type: SaPluginType.Select,
        options: [
          {
            label: 'none',
            value: 'none',
          },
          {
            label: 'dashed',
            value: 'dashed',
          },
          {
            label: 'dotted',
            value: 'dotted',
          },
          {
            label: 'solid',
            value: 'solid',
          },
          {
            label: 'double',
            value: 'double',
          },
          {
            label: 'inset',
            value: 'inset',
          },
          {
            label: 'outset',
            value: 'outset',
          },
          {
            label: 'groove',
            value: 'groove',
          },
          {
            label: 'ridge',
            value: 'ridge',
          },
        ] as SaPluginOption[],
      },
      'border-color': {
        label: 'color',
        attr: 'border-color',
        type: SaPluginType.Color,
      },
    },
  },
  'widget-font': {
    label: 'font',
    collapsed: false,
    plugins: {
      'font-size': {
        label: 'size',
        attr: 'font-size',
        type: SaPluginType.Number,
      },
      'font-family': {
        label: 'family',
        attr: 'font-family',
        type: SaPluginType.Select,
        options: [
          {
            label: 'auto',
            value: 'auto',
          },
          {
            label: 'Arial',
            value: 'Arial',
          },
          {
            label: 'Verdana',
            value: 'Verdana',
          },
          {
            label: 'Tahoma',
            value: 'Tahoma',
          },
          {
            label: 'Trebuchet MS',
            value: 'Trebuchet MS',
          },
        ] as SaPluginOption[],
      },
      'font-decoration': {
        label: 'Deco',
        title: 'decoration',
        attr: 'font-decoration',
        type: SaPluginType.Select,
        options: [
          {
            label: 'none',
            value: 'none',
          },
          {
            label: 'underline',
            value: 'underline',
          },
          {
            label: 'line-through',
            value: 'line-through',
          },
          {
            label: 'overline',
            value: 'overline',
          },
        ] as SaPluginOption[],
      },
      'font-style': {
        label: 'style',
        attr: 'font-style',
        type: SaPluginType.Select,
        options: [
          {
            label: 'normal',
            value: 'normal',
          },
          {
            label: 'italic',
            value: 'italic',
          },
          {
            label: 'bold',
            value: 'bold',
          },
          {
            label: 'bold italic',
            value: 'bold-italic',
          },
        ] as SaPluginOption[],
      },
      'font-color': {
        label: 'color',
        attr: 'font-color',
        type: SaPluginType.Color,
        inline: true,
      },
    },
  },
  'widget-align': {
    label: 'align',
    collapsed: false,
    plugins: {
      'align-horizontal': {
        label: 'H',
        title: 'horizontal',
        attr: 'align-horizontal',
        type: SaPluginType.Select,
        options: [
          {
            label: 'left',
            value: 'flex-start',
          },
          {
            label: 'center',
            value: 'center',
          },
          {
            label: 'right',
            value: 'flex-end',
          },
        ] as SaPluginOption[],
      },
      'align-vertical': {
        label: 'V',
        title: 'vertical',
        attr: 'align-vertical',
        type: SaPluginType.Select,
        options: [
          {
            label: 'top',
            value: 'start',
          },
          {
            label: 'center',
            value: 'center',
          },
          {
            label: 'bottom',
            value: 'end',
          },
        ] as SaPluginOption[],
      },
    },
  },
} as const

export type SaPluginLayout = {
  [key in ElementType]: {
    /** basic property plugins */
    basic?: SaPluginCombination[]
    extend?: SaPluginCombination[]
  }
}
