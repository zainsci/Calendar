<script lang="ts">
  import DaysHeader from "./main/DaysHeader.svelte"
  import Calendar from "./main/Calendar.svelte"
</script>

<div
  id="Main"
  class="col-span-3 w-full flex flex-col justify-start items-center p-4"
>
  <DaysHeader />
  <Calendar />
</div>

<style type="text/scss">
  #Main {
    height: calc(100vh - 6.5rem);
  }
</style>
