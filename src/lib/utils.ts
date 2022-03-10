import type { DateObject, Note } from "./types"

export function checkIfNotFromThisMonth(day, idx) {
  return !!((idx > 28 && day < 20) || (idx < 10 && day > 10))
}

export function checkIfFromPrevMonth(day, idx) {
  return !!(idx < 10 && day > 10)
}

export function checkIfFromNextMonth(day, idx) {
  return !!(idx > 28 && day < 20)
}

export function getThisMonthNotes(notes: Array<Note>, date: DateObject) {
  return notes.filter(
    (note) => note.date.month === date.month && note.date.year === date.year
  )
}
