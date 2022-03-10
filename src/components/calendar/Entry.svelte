<script lang="ts">
  import { createEventDispatcher } from "svelte"

  import type { NoteProps } from "../../lib/types"
  import {
    checkIfFromNextMonth,
    checkIfFromPrevMonth,
    checkIfNotFromThisMonth,
    getThisDayNotes,
  } from "../../lib/utils"
  import { dateStore, notesStore } from "../../lib/store"
  import AddEvent from "./AddNote.svelte"

  export let day: number
  export let idx: number
  let showEventButton = false
  let allNotes: NoteProps[]
  notesStore.subscribe((notes) => (allNotes = notes))

  const dispatch = createEventDispatcher()

  function getClassNames(day: number, idx: number) {
    let className = [
      "px-4 py-2 bg-gray-100 dark:bg-gray-800 sel ect-none flex flex-col justify-between hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer relative",
    ]

    if ((idx + 1) % 7 === 0 || (idx + 1) % 7 === 6) {
      className.push("bg-gray-200 dark:bg-gray-700")
    }

    if (checkIfNotFromThisMonth(day, idx)) {
      className.push("text-gray-500 dark:text-gray-400")
    }

    return className.join(" ")
  }

  function getCurrentDateClass(day: number, idx: number) {
    const className = ["w-6 h-6 flex justify-center items-center rounded-full"]

    let d = new Date()
    if (
      $dateStore.month === d.getMonth() &&
      day === d.getDate() &&
      $dateStore.year === d.getFullYear() &&
      idx <= 31
    ) {
      className.push("bg-red-500 text-white")
    }

    return className.join(" ")
  }

  function handleClick(day: number, idx: number) {
    if (checkIfFromNextMonth(day, idx)) {
      dateStore.update((date) => {
        return {
          ...date,
          month: date.month === 11 ? 0 : date.month + 1,
          year: date.month === 11 ? date.year + 1 : date.year,
        }
      })
    }

    if (checkIfFromPrevMonth(day, idx)) {
      dateStore.update((date) => {
        return {
          ...date,
          month: date.month === 0 ? 11 : date.month - 1,
          year: date.month === 0 ? date.year - 1 : date.year,
        }
      })
    }

    return
  }
</script>

<li
  class={getClassNames(day, idx)}
  on:mouseenter={() => (showEventButton = true)}
  on:mouseleave={() => (showEventButton = false)}
  on:click={() => handleClick(day, idx)}
>
  <span class={getCurrentDateClass(day, idx)}>
    {day}
  </span>

  <div class="h-4 flex">
    {#each getThisDayNotes(allNotes, day, idx) as _}
      <span class="w-2 h-2 bg-purple-500 ml-2 rounded-full" />
    {/each}
  </div>

  {#if !checkIfNotFromThisMonth(day, idx)}
    {#if showEventButton}
      <AddEvent onClick={() => dispatch("addnewnote")} />
    {/if}
  {/if}
</li>
