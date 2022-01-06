import { ElementType } from '../element';
import { BasicPlugins, SaPluginLayout } from '../plugin';
import { PcDrawer } from './drawer';
import { PcElementAttributes } from './element';

export const PcPlugin: SaPluginLayout = {
  [ElementType.Canvas]: {
    basic: [
      BasicPlugins['widget-id'],
      BasicPlugins['widget-name'],
      BasicPlugins['widget-width'],
      BasicPlugins['widget-height'],
    ]
  },
  [ElementType.Container]: {
    basic: [
      BasicPlugins['widget-id'],
      BasicPlugins['widget-name'],
      BasicPlugins['widget-width'],
      BasicPlugins['widget-height'],
      BasicPlugins['widget-offsetX'],
      BasicPlugins['widget-offsetY'],
    ]
  },
  [ElementType.Button]: {
    basic: [
      BasicPlugins['widget-id'],
      BasicPlugins['widget-name'],
      BasicPlugins['widget-width'],
      BasicPlugins['widget-height'],
      BasicPlugins['widget-offsetX'],
      BasicPlugins['widget-offsetY'],
    ]
  }
};

export function pcPluginValueChange<T extends keyof PcElementAttributes>(key: T, value: PcElementAttributes[T], drawer: PcDrawer) {
  const seleceted = drawer.selected[0];

  if (!seleceted) return;

  drawer.updateElemData(seleceted, { [key]: value });
}