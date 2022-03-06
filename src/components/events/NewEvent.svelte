<script>
  import { createEventDispatcher } from "svelte"

  import Button from "../button/Button.svelte"
  import Input from "../input/Input.svelte"
  import Close from "../../icons/close.svelte"
  import TextArea from "../textarea/TextArea.svelte"

  const dispatch = createEventDispatcher()

  export let date
  function handleSubmit(e) {
    e.preventDefault()

    console.log(e)
  }

  function closeEventForm(e) {
    e.stopPropagation()

    dispatch("closeeventform")
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
    <h1 class="mb-4 text-2xl">Add A New Event To {date}</h1>
    <Input placeholder="Event Name Here!" type="text" name="eventName" />
    <TextArea name="eventDesc" placeholder="Event Details Here!" />
    <Button>Add New Event</Button>
  </form>
</div>
