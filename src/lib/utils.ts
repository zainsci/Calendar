export function checkIfNotFromThisMonth(day, idx) {
  return !!((idx > 25 && day < 25) || (idx < 10 && day > 10))
}

export function checkIfFromPrevMonth(day, idx) {
  return !!(idx < 10 && day > 10)
}

export function checkIfFromNextMonth(day, idx) {
  return !!(idx < 10 && day > 10)
}
