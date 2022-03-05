<script>
  import dayjs from "dayjs"
  import globalStore from "../../lib/store"

  let selectedDate = {}

  globalStore.subscribe((d) => (selectedDate = { ...d }))

  function getCalender(y, m) {
    const grid = []
    y = parseInt(y, 10)
    m = parseInt(m, 10)

    const preYear = m === 0 ? y - 1 : y
    const preMonth = m === 0 ? 11 : m - 1

    const wDay = getWeekDay(y, m, 0)

    const DaysInMonth = dayjs(`${y}-${m + 1}`).daysInMonth()
    const DaysInPrevMonth = dayjs(`${preYear}-${preMonth + 1}`).daysInMonth()

    const preMonthDaysInGrid = wDay - 1

    for (
      let i = DaysInPrevMonth - preMonthDaysInGrid;
      i <= DaysInPrevMonth;
      i++
    ) {
      grid.push(i)
    }
    for (let i = 1; i <= DaysInMonth; i++) {
      grid.push(i)
    }
    const l = grid.length
    for (let i = l; i < 42; i++) {
      grid.push(i - l + 1)
    }

    return grid
  }

  // To get the day of the week
  function getWeekDay(y, m, d) {
    const w = new Date(y, m, d).getDay()
    return w === 0 ? 7 : w
  }

  function getClassNames(day, i) {
    let className = [
      "px-4 py-2 bg-gray-200 dark:bg-gray-800 sel ect-none flex flex-col justify-between hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer",
    ]

    if ((i + 1) % 7 === 0 || (i + 1) % 7 === 6) {
      className.push("text-gray-500 dark:text-gray-400")
    }

    if ((i > 25 && day < 25) || (i < 10 && day > 10)) {
      className.push("text-gray-500 dark:text-gray-400")
    }

    return className.join(" ")
  }

  function getCurrentDateClass(day, i) {
    const className = ["w-6 h-6 flex justify-center items-center rounded-full"]

    let d = new Date()
    if (
      selectedDate.month === d.getMonth() &&
      day === d.getDay() - 1 &&
      selectedDate.year === d.getFullYear() &&
      i <= day
    ) {
      className.push("bg-red-500 text-white")
    }

    return className.join(" ")
  }
</script>

<ul class="w-full h-full grid grid-cols-7 list-none gap-2">
  {#each getCalender(selectedDate.year, selectedDate.month) as day, i}
    <li class={getClassNames(day, i)}>
      <span class={getCurrentDateClass(day, i)}>
        {day}
      </span>
    </li>
  {/each}
</ul>

<style type="text/scss">
</style>
