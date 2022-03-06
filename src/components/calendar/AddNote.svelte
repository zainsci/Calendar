<script>
  export let onClick = () => {}
</script>

<div
  class="w-5 h-5 rounded-sm bg-gray-100 dark:bg-gray-900 border border-gray-500 dark:border-gray-300 text-gray-500 dark:text-gray-300 flex justify-center items-center absolute bottom-3 right-3 hover:bg-inherit dark:hover:bg-inherit select-none"
  on:click={onClick}
>
  +
</div>
