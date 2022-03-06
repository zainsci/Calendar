import { writable } from "svelte/store"
import dayjs from "dayjs"

let thisTime = dayjs()

export const dateStore = writable({
  day: thisTime.day(),
  date: thisTime.date(),
  month: thisTime.month(),
  year: thisTime.year(),
})

export const notesStore = writable([
  {
    id: "001",
    title: "First Note!!",
    note: "This is the default note for March 06, 2021",
    date: {
      date: 6,
      month: 2,
      year: 2022,
    },
  },
])
