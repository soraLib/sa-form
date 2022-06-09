import { BasicElement, BasicElementAttributes } from './element'

export enum BasicRecordType {
  /** add element */
  Add,
  /** delete element */
  Delete,
  /** modify element attribute */
  Attr,
}

/** update record data */
export type URecordData = {
  id: string
  prev: Partial<BasicElementAttributes>
  next: Partial<BasicElementAttributes>
}

/** create or delete record data */
export type CDRecordData = {
  prev?: BasicElement
  next?: BasicElement
}

export type BasicRecordData = CDRecordData | URecordData

/** is update record data */
export function isURecordData(data: BasicRecordData): data is URecordData {
  return Reflect.has(data, 'id')
}

/** is create or delete record data */
export function isCDRecordData(data: BasicRecordData): data is CDRecordData {
  return !Reflect.has(data, 'id')
}

export type CDRecordDataList = CDRecordData[]
export type URecordDataList = URecordData[]
export type BasicRecordDataList = CDRecordDataList | URecordDataList

/** is update record data list */
export function isURecordDataList(data: BasicRecordDataList): data is URecordDataList {
  return Reflect.has(data[0], 'id')
}

/** is create or delete record data list */
export function isCDRecordDataList(data: BasicRecordDataList): data is CDRecordDataList {
  return !Reflect.has(data[0], 'id')
}

export interface BasicRecord {
  /** record type */
  type: BasicRecordType
  /** record time */
  time: Date
  /** record element history data */
  data: BasicRecordDataList
}

/** basic record store */
export interface BasicRecordStore {
  /** record histories */
  records: BasicRecord[]
  /** current record history index, for record undo and redo */
  index: number
  /** max length of record history list */
  max: number
  /** is recording opened */
  recording: boolean

  getPrevRecord(): BasicRecord | undefined
  getNextRecord(): BasicRecord | undefined
}