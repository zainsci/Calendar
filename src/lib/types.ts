export interface DateObject {
  date: number | string
  month: number | string
  year: number | string
}

export interface Note {
  id: string
  title: string
  note: string
  date: DateObject
}
