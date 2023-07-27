import dayjs from 'dayjs'

export const timeFormat = (time: Date, tempalte = 'yyyy-MM-dd'): string =>
  dayjs(time).format(tempalte)
