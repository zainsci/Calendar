<script lang="ts">
  import { createEventDispatcher } from "svelte"

  import { notesStore, dateStore } from "../../lib/store"
  import type { NoteProps } from "../../lib/types"
  import { getThisMonthNotes } from "../../lib/utils"

  let allNotes: NoteProps[]
  notesStore.subscribe((notes) => (allNotes = notes))
  const dispatch = createEventDispatcher()

  function showNote(id: string) {
    dispatch("createnewnote", {
      noteId: id,
    })
  }
</script>

<div class="flex flex-col gap-2 mt-4">
  {#each getThisMonthNotes(allNotes, $dateStore) as note}
    <div
      class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer"
      on:click={() => showNote(note.id)}
    >
      {note.title}
    </div>
  {/each}
</div>
