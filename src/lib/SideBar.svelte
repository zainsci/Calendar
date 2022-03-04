<script lang="ts">
  import ThemeToggler from "../components/side-bar/ThemeToggler.svelte";
  import FullDate from "../components/side-bar/FullDate.svelte";
</script>

<section class="col-span-1 w-full h-full border-l-2 border-gray-500 px-4">
  <ThemeToggler />
  <FullDate />

  <div class="side__section__date" />
  <div class="side__section__events" />
</section>

<style type="text/scss">
</style>
