import { BasicPlugins, SaPluginLayout } from '../plugin';
import { BasicRecordType } from '../record';
import { PcDrawer } from './drawer';
import { PcElementAttributes } from './element';
import { PcRecord } from './record';

import { cloneDeep } from 'lodash-es';

export const PcPlugin: SaPluginLayout = {
  basic: [
    BasicPlugins['widget-id'],
    BasicPlugins['widget-name'],
    BasicPlugins['widget-width'],
    BasicPlugins['widget-height'],
    BasicPlugins['widget-offsetX'],
    BasicPlugins['widget-offsetY']
  ]
};

export function pcPluginValueChange<T extends keyof PcElementAttributes>(key: T, value: PcElementAttributes[T], drawer: PcDrawer) {
  const seleceted = drawer.selected[0];

  if (!seleceted) return;

  const record = new PcRecord({
    time: new Date(),
    type: BasicRecordType.Attr,
    data: [{
      id: seleceted.attrs.id,
      prev: {
        [key]: cloneDeep(seleceted.attrs[key])
      },
      next: {
        [key]: cloneDeep(value)
      }
    }]
  });

  drawer.updateElemData(seleceted, { [key]: value });
}