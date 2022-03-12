<script lang="ts">
  import { createEventDispatcher } from "svelte"

  import { notesStore } from "../../lib/store"
  import Button from "../button/Button.svelte"
  import Input from "../input/Input.svelte"
  import Close from "../../icons/close.svelte"
  import TextArea from "../textarea/TextArea.svelte"

  export let date: string
  let noteTitle: string
  let noteDesc: string
  let showError = false

  const dispatch = createEventDispatcher()

  function handleSubmit(e) {
    e.preventDefault()

    if (noteTitle === "") {
      showError = true

      setTimeout(() => {
        showError = false
      }, 2000)

      return
    }

    const d = new Date(date)

    notesStore.update((store) => {
      const thisNote = {
        id: Date.now().toString(),
        title: noteTitle,
        note: noteDesc,
        date: {
          date: d.getDate(),
          month: d.getMonth(),
          year: d.getFullYear(),
        },
      }

      return [...store, thisNote]
    })

    noteTitle = ""
    noteDesc = ""
  }

  function closeEventForm(e) {
    e.stopPropagation()

    dispatch("closenoteeditor")
  }
</script>

<div
  class="w-full h-full bg-opacity-70 bg-gray-900 absolute top-0 left-0 z-40 flex justify-center items-center"
  on:click={closeEventForm}
/>

<div
  class="w-full max-w-xl p-8 bg-white dark:bg-gray-800 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
>
  <div
    class="w-8 h-8 bg-gray-200 dark:bg-gray-700 select-none cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 flex justify-center items-center rounded-full absolute top-4 right-4"
    on:click={closeEventForm}
  >
    <Close />
  </div>
  <form action="" on:submit={handleSubmit} class="flex flex-col">
    <h1 class="mb-4 text-2xl">Add A New Note To {date}</h1>
    <Input
      placeholder="Note Title Here!"
      name="eventName"
      bind:value={noteTitle}
      error={showError}
    />
    <TextArea
      name="eventDesc"
      placeholder="Note Details Here!"
      bind:value={noteDesc}
    />
    {#if showError}
      <div class="text-red-500 mb-4">A note must have a title</div>
    {/if}
    <Button>Add New Note</Button>
  </form>
</div>
