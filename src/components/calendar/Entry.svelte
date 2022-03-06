<script>
  import { createEventDispatcher } from "svelte"

  import {
    checkIfFromNextMonth,
    checkIfFromPrevMonth,
    checkIfNotFromThisMonth,
  } from "../../lib/utils"

  import globalStore from "../../lib/store"
  import AddEvent from "./AddEvent.svelte"

  export let day
  export let idx

  const dispatch = createEventDispatcher()
  let showEventButton = false

  function getClassNames(day, idx) {
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

  function getCurrentDateClass(day, idx) {
    const className = ["w-6 h-6 flex justify-center items-center rounded-full"]

    let d = new Date()
    if (
      $globalStore.month === d.getMonth() &&
      day === d.getDate() &&
      $globalStore.year === d.getFullYear() &&
      idx <= 31
    ) {
      className.push("bg-red-500 text-white")
    }

    return className.join(" ")
  }

  function handleClick(day, idx) {
    if (checkIfFromNextMonth(day, idx)) {
      globalStore.update((date) => {
        return {
          ...date,
          month: date.month === 11 ? 0 : date.month + 1,
          year: date.month === 11 ? date.year + 1 : date.year,
        }
      })
    }

    if (checkIfFromPrevMonth(day, idx)) {
      globalStore.update((date) => {
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

  {#if !checkIfNotFromThisMonth(day, idx)}
    {#if showEventButton}
      <AddEvent onClick={() => dispatch("addnewevent")} />
    {/if}
  {/if}
</li>
