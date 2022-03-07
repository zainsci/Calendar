<script lang="ts">
  import CalendarIcon from "../icons/calendar.svelte"
  import MinimizeIcon from "../icons/minimize.svelte"
  import CloseIcon from "../icons/close.svelte"
</script>

<div
  id="frame"
  class="w-full h-11 flex justify-between items-center border-b-4 border-b-purple-600 select-none"
>
  <div class="flex justify-center items-center text-base px-3">
    <CalendarIcon />
    <span class="ml-3">Calendar</span>
  </div>
  <div class="flex justify-center items-center z-50 px-3" id="utils">
    <div
      class="h-10 w-16 flex justify-center items-center z-50 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
      id="minimizeWindow"
    >
      <MinimizeIcon />
    </div>
    <div
      class="h-10 w-16 flex justify-center items-center z-50 cursor-pointer hover:bg-red-600 dark:hover:bg-red-600"
      id="closeWindow"
    >
      <CloseIcon />
    </div>
  </div>
</div>

<style>
  #frame {
    -webkit-app-region: drag;
  }
  #utils {
    -webkit-app-region: no-drag;
  }
</style>
