<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte"

  import { notesStore } from "../../lib/store"
  import Close from "../../icons/close.svelte"
  import { MONTHS } from "../../lib/constants"

  import type { Note } from "../../lib/types"

  export let noteId: string
  let thisNote: Note
  const dispatch = createEventDispatcher()

  onMount(() => {
    thisNote = $notesStore.filter((note) => note.id === noteId)[0]
  })

  function closeViewer() {
    dispatch("closenoteviewer")
  }
</script>

{#if thisNote}
  <div
    class="w-full h-full bg-opacity-70 bg-gray-900 absolute top-0 left-0 z-40 flex justify-center items-center"
    on:click={closeViewer}
  />

  <div
    class="w-full max-w-xl p-8 bg-white dark:bg-gray-800 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
  >
    <div
      class="w-8 h-8 bg-gray-200 dark:bg-gray-700 select-none cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 flex justify-center items-center rounded-full absolute top-4 right-4"
      on:click={closeViewer}
    >
      <Close />
    </div>

    <h1 class="text-xl mb-2">{thisNote.title}</h1>
    <div class="text-gray-500 mb-4 text-sm">
      {MONTHS[thisNote?.date?.month]}
      {thisNote?.date?.date}, {thisNote?.date?.year}
    </div>
    <div class="">{thisNote.note}</div>
  </div>
{/if}
