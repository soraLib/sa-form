import { SaPluginType } from '../../plugin'
import type { SaPluginOption } from '../../plugin'

export const TimePickerPlugins = {
  'widget-time-format': {
    label: 'format',
    title: 'time-format',
    attr: 'time-format',
    type: SaPluginType.Select,
    options: [
      {
        label: 'yyyy-MM-dd',
        value: 'yyyy-MM-dd',
      },
      {
        label: 'yyyy-MM-dd hh:mm:ss',
        value: 'yyyy-MM-dd hh:mm:ss',
      },
      {
        label: 'yyyy-MM-dd HH:mm:ss',
        value: 'yyyy-MM-dd HH:mm:ss',
      },
    ] as SaPluginOption[],
  },
} as const
