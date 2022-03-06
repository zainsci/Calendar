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

<div
  class="w-full max-w-xl p-8 bg-white dark:bg-gray-800 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
>
  <div
    class="w-8 h-8 bg-gray-200 dark:bg-gray-700 select-none cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 flex justify-center items-center rounded-full absolute top-4 right-4"
    on:click={closeEventForm}
  >
    X
  </div>
  <form action="" on:submit={handleSubmit} class="flex flex-col">
    <h1 class="mb-4 text-2xl">Add A New Event To {date}</h1>
    <input
      type="text"
      class="px-4 py-2 border-2 dark:bg-gray-900 border-purple-400 rounded-lg mb-4 focus:outline-none focus:border-purple-500"
      placeholder="Add Event Names"
    />
    <textarea
      name="eventDesc"
      id="eventDesc"
      cols="30"
      rows="10"
      class="px-4 py-2 border-2 dark:bg-gray-900 border-purple-400 rounded-lg mb-4 focus:outline-none focus:border-purple-500"
      placeholder="Event Details Here!"
    />
    <button
      class="px-4 py-2 text-white bg-purple-500 dark:bg-purple-400 hover:bg-purple-600  dark:hover:bg-purple-500 rounded-lg"
    >
      Add New Event
    </button>
  </form>
</div>
