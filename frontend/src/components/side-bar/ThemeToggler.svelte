<script lang="ts">
  import SunIcon from "../../icons/sun.svelte"
  import MoonIcon from "../../icons/moon.svelte"

  let darkTheme = false

  function toggleTheme() {
    darkTheme = !darkTheme

    if (darkTheme) {
      document.documentElement.classList.add("dark")
      window.localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      window.localStorage.setItem("theme", "light")
    }
  }
</script>

<div class="flex justify-between items-center p-2">
  <div
    class="ml-auto flex justify-center items-center p-2 rounded-full cursor-pointer transition-all ease-linear duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
    on:click={toggleTheme}
  >
    {#if darkTheme}
      <div class="p-0 m-0 w-6 h-6">
        <SunIcon />
      </div>
    {:else}
      <div class="p-0 m-0 w-6 h-6">
        <MoonIcon />
      </div>
    {/if}
  </div>
</div>

<style>
</style>
