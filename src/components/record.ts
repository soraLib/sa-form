import { BasicElement, BasicElementAttributes } from './element';

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
  element: BasicElement | BasicElement[];
}

/** basic record store */
export interface BasicRecordStore {
  /** record histories */
  records: BasicRecord[];
  /** current record history index, for record undo and resume */
  index: number;
  /** max length of record history list */
  max: number;
  /** is recording opened */
  recording: boolean;
}