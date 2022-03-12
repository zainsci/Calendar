export interface DateProps {
  date: number | string
  month: number | string
  year: number | string
}

export interface NoteProps {
  id: string
  title: string
  note: string
  date: DateProps
}
