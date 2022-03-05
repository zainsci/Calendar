<script>
  import { createEventDispatcher } from "svelte"

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

<form
  action=""
  on:submit={handleSubmit}
  class="w-full max-w-xl p-8 bg-white flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
>
  <h1 class="mb-4 text-2xl">Add A New Event To {date}</h1>
  <input
    type="text"
    class="px-4 py-2 border-2 border-blue-400 rounded-lg mb-4 focus:outline-none focus:border-blue-600 focus:shadow-md focus:shadow-blue-400"
    placeholder="Add Event Names"
  />
  <textarea
    name="eventDesc"
    id="eventDesc"
    cols="30"
    rows="10"
    class="px-4 py-2 border-2 border-blue-400 rounded-lg mb-4 focus:outline-none focus:border-blue-600 focus:shadow-md focus:shadow-blue-400"
    placeholder="Event Details Here!"
  />
  <button class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
    Add New Event
  </button>
</form>
