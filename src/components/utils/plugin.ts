import { BasicDrawer } from '../drawer';
import { SaPlugin } from '../plugin';

export function getPluginValue(drawer: BasicDrawer, plugin: SaPlugin) {
  const selected = drawer.selected[0];
  if (!selected) return;

  return selected.attrs[plugin.attr];
}