import { BasicPlugins, SaPluginLayout } from '../plugin';
import { PcDrawer } from './drawer';
import { PcElementAttributes } from './element';

export const PcPlugin: SaPluginLayout = {
  basic: [
    BasicPlugins['widget-id'],
    BasicPlugins['widget-name']
  ]
};

export function pcPluginValueChange<T extends keyof PcElementAttributes>(key: T, value: PcElementAttributes[T], drawer: PcDrawer) {
  const seleceted = drawer.selected[0];

  if (!seleceted) return;

  drawer.updateElemAttr(seleceted, key, value);

  const cell = drawer.graph?.getCellById(seleceted.attrs.id);

  if (cell) {
    cell.updateData({ [key]: value });
  }
}