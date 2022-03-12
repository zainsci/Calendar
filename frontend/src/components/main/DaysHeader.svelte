<script lang="ts">
  import { DAYS } from "../../lib/constants"
</script>

<header class="w-full mb-2">
  <ul class="w-full grid grid-cols-7 gap-2 list-none">
    {#each DAYS as day}
      <li class="w-full bg-gray-200 dark:bg-gray-800 px-4 py-2">
        {day.slice(0, 3)}
      </li>
    {/each}
  </ul>
</header>

<style type="text/scss">
</style>
