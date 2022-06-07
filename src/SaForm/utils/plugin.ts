import { BasicDrawer } from '../drawer';
import { SaPlugin } from '../plugin';
import { isElementAttribute } from './element';

export function getPluginValue(drawer: BasicDrawer, plugin: SaPlugin) {
  const selected = drawer.selected[0];
  if (!selected) return;

  if (isElementAttribute(plugin.attr, selected)) {
    return selected.attrs[plugin.attr];
  }

  return;
}