import { SaPluginType } from '../../plugin'
import type { CSSProperties } from 'vue'

export enum TableColumnAlign {
  Left = 1,
  Center = 2,
  Right = 3,
}
export type TableDataColumn = {
  title: string
  width?: number
  align: TableColumnAlign
  color: CSSProperties['color']
  backgroundColor: CSSProperties['backgroundColor']
  wrappable: boolean
  isHtml: boolean
  sortable: boolean
}
export type TableData = TableDataColumn[]

export const TablePlugins = {
  'widget-table': {
    label: 'data',
    title: 'table-data',
    attr: 'data',
    collapsed: false,
    type: SaPluginType.Dialog,
    dialog: {
      component: 'widget-table-data',
      title: 'Table Data',
    },
    filter: (value: TableData) => value.map((item) => item.title).join('; '),
  },
} as const
