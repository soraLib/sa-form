import type {
  BasicRecord,
  BasicRecordDataList,
  BasicRecordStore,
  BasicRecordType,
} from '../record'

export class PcRecord implements BasicRecord {
  type: BasicRecordType
  time: Date
  data: BasicRecordDataList

  constructor(config: Partial<PcRecord> & Omit<PcRecord, 'time'>) {
    this.time = config.time ?? new Date()
    this.type = config.type
    this.data = config.data
  }
}

export class PcRecordStore implements BasicRecordStore {
  records: PcRecord[] = []
  index = -1
  max: number
  recording: boolean

  constructor(config?: Partial<Pick<PcRecordStore, 'max' | 'recording'>>) {
    this.max = config?.max ?? 20
    this.recording = config?.recording ?? true
  }

  getPrevRecord() {
    if (this.index < 0) return

    return this.records[this.index]
  }

  getNextRecord() {
    if (this.index >= this.records.length - 1) return

    return this.records[this.index + 1]
  }
}
