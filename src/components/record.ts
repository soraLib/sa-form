import { BasicElement, BasicElementAttributes } from './element';

import { DeepPartial } from 'sugar-sajs';

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

/** update record data */
export type URecordData = {
  id: string;
  prev: Partial<BasicElementAttributes>;
  next: Partial<BasicElementAttributes>;
};

/** create or delete record data */
export type CDRecordData = {
  prev?: BasicElement;
  next?: BasicElement;
};

export type BasicRecordData = CDRecordData | URecordData;

/** is update record data */
export function isURecordData(data: BasicRecordDataList): data is URecordDataList {
  return Reflect.has(data[0], 'id');
}

/** is create or delete record data */
export function isCDRecordData(data: BasicRecordDataList): data is CDRecordDataList {
  return !Reflect.has(data[0], 'id');
}

export type CDRecordDataList = CDRecordData[];
export type URecordDataList = URecordData[];
export type BasicRecordDataList = CDRecordDataList | URecordDataList;
export interface BasicRecord {
  /** record type */
  type: BasicRecordType;
  /** record time */
  time: Date;
  /** record element history data */
  data: BasicRecordDataList;
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
  /** last operated ids, cleaned every time when create new record */
  lastOperatedIds: string[];

  getPrevRecord(): BasicRecord | undefined;
  getNextRecord(): BasicRecord | undefined;
}