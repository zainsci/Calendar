<script>
  import globalStore from "../lib/store";

  export let name = "";
  export let list = [];
  export let type = "";
  export let temp = null;

  function updateDate(type) {
    globalStore.update((data) => {
      data[type] = temp;
    });
  }

  let isOpen = false;
</script>

<div class="w-full h-10 bg-gray-200 dark:bg-gray-800 relative">
  <div
    class="w-full h-full flex justify-center items-center cursor-pointer whitespace-nowrap select-none"
    on:click={() => (isOpen = !isOpen)}
  >
    {name}
  </div>
  {#if isOpen}
    <ul
      class="max-h-96 w-full overflow-y-scroll whitespace-nowrap list-none absolute top-12 left-0 shadow-md"
    >
      {#each list as x}
        <li
          class="w-full h-full bg-gray-200 dark:bg-gray-800 px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 border-b border-b-gray-400 dark:border-b-gray-600"
        >
          {x}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style type="text/scss">
</style>
