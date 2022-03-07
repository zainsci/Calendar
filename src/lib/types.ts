export interface Note {
  id: string
  title: string
  note: string
  date: {
    date: number | string
    month: number | string
    year: number | string
  }
}
