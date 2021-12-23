import { BasicDrawer, DrawerType } from '../drawer';
import { BasicElement, ElementType } from '../element';
import { BasicRecordStore, BasicRecord } from '../record';
import { PcElement } from './element';
import { PcRecordStore } from './record';

/** pc drawer */
export class PcDrawer implements BasicDrawer {
  type: DrawerType;
  canvas: PcElement;
  record: BasicRecordStore;
  selected: BasicElement[] = [];

  constructor(config: Partial<PcElement> & {attrs: {}}) {
    this.type = 'PcForm';
    this.record = new PcRecordStore();
    this.canvas = new PcElement({
      type: ElementType.Canvas,
      parent: undefined,
      children: [],
      attrs: config.attrs
    });
  }
}