import { BasicDrawer, DrawerType } from '../drawer';
import { BasicElement, ElementType } from '../element';
import { BasicRecordStore, BasicRecord } from '../record';
import { PcElement } from './element';
import { PcRecordStore } from './record';

/** pc drawer */
export class PcDrawer implements BasicDrawer {
  type = DrawerType.PcForm;
  canvas: PcElement;
  record: BasicRecordStore;
  selected: BasicElement[] = [];

  constructor(config: Partial<PcElement> & {attrs: {}}) {
    this.record = new PcRecordStore();
    this.canvas = new PcElement({
      type: ElementType.Canvas,
      parent: undefined,
      children: [],
      attrs: {
        id: config.attrs.id,
        name: config.attrs.name,
        width: 800,
        height: 600,
        offsetX: 0,
        offsetY: 0
      }
    });
  }
}