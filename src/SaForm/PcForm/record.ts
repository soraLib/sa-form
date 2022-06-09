import { BasicRecord, BasicRecordDataList, BasicRecordStore, BasicRecordType } from '../record'

export class PcRecord implements BasicRecord {
  type: BasicRecordType
  time: Date
  data: BasicRecordDataList

  constructor(config: PcRecord) {
    this.time = config.time
    this.type = config.type
    this.data = config.data
  }
}

export class PcRecordStore implements BasicRecordStore {
  records: PcRecord[] = []
  index: number = -1
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
