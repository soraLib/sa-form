import { BasicRecord, BasicRecordStore, BasicRecordType } from '../record';
import { PcElement, PcElementAttributes } from './element';

export class PcRecord implements BasicRecord {
  type: BasicRecordType;
  time: Date;
  attr?: keyof PcElementAttributes | (keyof PcElementAttributes)[] | undefined;
  element: PcElement | PcElement[];

  constructor(config: PcRecord) {
    this.time = config.time;
    this.type = config.type;
    this.element = config.element;
    if (config.attr) this.attr = config.attr;
  }
}

export class PcRecordStore implements BasicRecordStore {
  records: PcRecord[] = [];
  index: number = 0;
  max: number;
  recording: boolean;

  constructor(config?: Partial<Pick<PcRecordStore, 'max' | 'recording'>>) {
    this.max = config?.max ?? 20;
    this.recording = config?.recording ?? true;
  }
}
