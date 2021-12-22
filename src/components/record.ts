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
  /**
   * record attrs
   * save all attrs on elements if 'attr' is not set
   */
  attr?: keyof BasicElementAttributes | (keyof BasicElementAttributes)[];
  /** record elements */
  element: BasicRecordType | BasicRecordType[];
}

/** basic record store */
export interface BasicRecordStore {
  /** store records */
  records: BasicRecord[];
  /** current operate index, for record undo and resume */
  index: number;
  /** max length of record list */
  max: number;
  /** is recording opened */
  recording: boolean;
}