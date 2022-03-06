<script>
  import { createEventDispatcher } from "svelte"
  import { notesStore, dateStore } from "../../lib/store"

  const dispatch = createEventDispatcher()

  let allNotes = []
  notesStore.subscribe((store) => (allNotes = store))

  function showNote(id) {
    dispatch("createnewnote", {
      noteId: id,
    })
  }
</script>

<div class="flex flex-col gap-2 mt-4">
  {#each allNotes.filter((note) => note.date.month === $dateStore.month) as note}
    <div
      class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
      on:click={() => showNote(note.id)}
    >
      {note.title}
    </div>
  {/each}
</div>
