import { writable } from "svelte/store"
import dayjs from "dayjs"

let thisTime = dayjs()

const globalStore = writable({
  day: thisTime.day(),
  date: thisTime.date(),
  month: thisTime.month(),
  year: thisTime.year(),
})

export default globalStore
