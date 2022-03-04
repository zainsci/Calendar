<script>
  import dayjs from "dayjs"
  import globalStore from "../../lib/store"

  let data = {}

  globalStore.subscribe((d) => (data = { ...d }))

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
</script>

<ul class="w-full h-full grid grid-cols-7 list-none gap-2">
  {#each getCalender(data.year, data.month) as day, i}
    {#if (i + 1) % 7 === 0 || (i + 1) % 7 === 6}
      <li
        class="px-4 py-2 bg-gray-300 dark:bg-gray-700 select-none flex flex-col justify-between hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer"
      >
        {day}
      </li>
    {:else}
      <li
        class="px-4 py-2 bg-gray-200 dark:bg-gray-800 select-none flex flex-col justify-between hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
      >
        {day}
      </li>
    {/if}
  {/each}
</ul>

<style type="text/scss">
</style>
