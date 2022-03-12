<script lang="ts">
  import dayjs from "dayjs"

  import { dateStore } from "../../lib/store"
  import Entry from "../calendar/Entry.svelte"
  import NewEvent from "../notes/NewNote.svelte"
  import { MONTHS } from "../../lib/constants"

  let addNewEvent = false
  let eventDate: string

  function getCalender(y: number, m: number): number[] {
    const grid = []

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
  function getWeekDay(y: number, m: number, d: number) {
    const w = new Date(y, m, d).getDay()
    return w === 0 ? 7 : w
  }

  function addNewEventToCal(day: number) {
    addNewEvent = !addNewEvent
    eventDate = `${MONTHS[$dateStore.month]} ${day}, ${$dateStore.year}`
  }

  function closeEventForm(e) {
    e.stopPropagation()

    addNewEvent = !addNewEvent
  }
</script>

{#if addNewEvent}
  <NewEvent date={eventDate} on:closenoteeditor={closeEventForm} />
{/if}

<ul class="w-full h-full grid grid-cols-7 list-none gap-2">
  {#each getCalender($dateStore.year, $dateStore.month) as day, i}
    <Entry {day} idx={i} on:addnewnote={() => addNewEventToCal(day)} />
  {/each}
</ul>

<style type="text/scss">
</style>
