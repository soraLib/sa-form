import { BasicElementAttributes } from './element';

export enum BasicRecordType {
  /** add element */
  Add,
  /** delete element */
  Delete,
  /** move element */
  Move,
  /** modify element attribute */
  Attr,
}

export interface BasicRecord {
  /** record type */
  type: BasicRecordType;
  /** record time */
  time: Date;
  /** record element history data */
  data: {
    id: string;
    prev: Partial<BasicElementAttributes>;
    next: Partial<BasicElementAttributes>;
  }[];
}

/** basic record store */
export interface BasicRecordStore {
  /** record histories */
  records: BasicRecord[];
  /** current record history index, for record undo and redo */
  index: number;
  /** max length of record history list */
  max: number;
  /** is recording opened */
  recording: boolean;

  getPrevRecord(): BasicRecord | undefined;
  getNextRecord(): BasicRecord | undefined;
}