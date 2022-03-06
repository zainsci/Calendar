<script lang="ts">
  import ThemeToggler from "../components/side-bar/ThemeToggler.svelte"
  import FullDate from "../components/side-bar/FullDate.svelte"
  import Notes from "../components/side-bar/Notes.svelte"
  import NoteViewer from "../components/notes/NoteViewer.svelte"

  let noteId = ""

  function openNote(e) {
    console.log(e.detail.noteId)
    noteId = e.detail.noteId
    showViewer = true
  }

  let showViewer = false

  function closeViewer() {
    showViewer = false
  }
</script>

<section class="col-span-1 w-full h-full border-l-2 border-gray-500 px-4">
  <ThemeToggler />
  <FullDate />

  <Notes on:createnewnote={openNote} />
</section>

{#if showViewer}
  {console.log(noteId)}
  <NoteViewer {noteId} on:closenoteviewer={closeViewer} />
{/if}

<style type="text/scss">
</style>
