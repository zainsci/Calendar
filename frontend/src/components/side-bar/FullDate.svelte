<script lang="ts">
  function getFullDate() {
    const thisDay = new Date()

    return `${thisDay.toLocaleDateString("en-US", {
      weekday: "long",
    })} - ${thisDay.toLocaleDateString("en-US", {
      month: "long",
    })} ${thisDay.getDate()}, ${thisDay.getFullYear()}`
  }
</script>

<div
  class="bg-gray-300 dark:bg-gray-800  w-full m-auto rounded-lg p-2 whitespace-pre-wrap text-center"
>
  {getFullDate()}
</div>

<style>
</style>
