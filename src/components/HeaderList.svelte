<script>
  import globalStore from "../lib/store"
  import { MONTHS } from "../lib/constants"

  export let name = ""
  export let list = []
  export let type = ""
  let isOpen = false

  function updateDate(x) {
    name = x
    isOpen = false

    if (typeof x === "string") {
      x = new Date(`${x} 1 2022`).getMonth()
    }

    globalStore.update((store) => {
      return {
        ...store,
        [type]: x,
      }
    })
  }
</script>

<div class="w-full h-10 bg-gray-200 dark:bg-gray-800 relative">
  <div
    class="w-full h-full flex justify-center items-center cursor-pointer whitespace-nowrap select-none"
    on:click={() => (isOpen = !isOpen)}
  >
    {#if typeof $globalStore[type] !== "undefined"}
      {#if type === "month"}
        {MONTHS[$globalStore[type]]}
      {:else}
        {$globalStore[type]}
      {/if}
    {/if}
  </div>
  {#if isOpen}
    <ul
      class="max-h-96 w-full overflow-y-scroll whitespace-nowrap list-none absolute top-12 left-0 shadow-md z-10"
    >
      {#each list as x}
        <li
          class="w-full h-full bg-gray-200 dark:bg-gray-800 px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 border-b border-b-gray-400 dark:border-b-gray-600"
          on:click={() => updateDate(x)}
        >
          {x}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style type="text/scss">
</style>
