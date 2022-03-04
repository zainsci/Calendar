<script>
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
</script>

<header class="w-full mb-2">
  <ul class="w-full grid grid-cols-7 gap-2 list-none">
    {#each days as day}
      {#if ["Saturday", "Sunday"].includes(day)}
        <li class="w-full bg-gray-300 dark:bg-gray-700 px-4 py-2">
          {day.slice(0, 3)}
        </li>
      {:else}
        <li class="w-full bg-gray-200 dark:bg-gray-800 px-4 py-2">
          {day.slice(0, 3)}
        </li>
      {/if}
    {/each}
  </ul>
</header>

<style type="text/scss">
</style>
