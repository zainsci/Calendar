import type { DateProps, NoteProps } from "./types"

export function checkIfNotFromThisMonth(day, idx) {
  return !!((idx > 28 && day < 20) || (idx < 10 && day > 10))
}

export function checkIfFromPrevMonth(day, idx) {
  return !!(idx < 10 && day > 10)
}

export function checkIfFromNextMonth(day, idx) {
  return !!(idx > 28 && day < 20)
}

export function getThisMonthNotes(notes: NoteProps[], date: DateProps) {
  return notes.filter(
    (note) => note.date.month === date.month && note.date.year === date.year
  )
}

export function getThisDayNotes(
  allNotes: NoteProps[],
  day: number,
  idx: number
) {
  return allNotes.filter(
    (note) => !checkIfNotFromThisMonth(day, idx) && note.date.date === day
  )
}

export function isElectron() {
  // Renderer process
  if (
    typeof window !== "undefined" &&
    typeof window.process === "object" &&
    window.process.type === "renderer"
  ) {
    return true
  }

  // Main process
  if (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    !!process.versions.electron
  ) {
    return true
  }

  // Detect the user agent when the `nodeIntegration` option is set to true
  if (
    typeof navigator === "object" &&
    typeof navigator.userAgent === "string" &&
    navigator.userAgent.indexOf("Electron") >= 0
  ) {
    return true
  }

  return false
}
