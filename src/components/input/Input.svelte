<script>
  export let placeholder
  export let type
  export let name
  export let label = ""
  export let value = ""
</script>

<label for={name} class="flex flex-col">
  {#if label !== ""}
    <span class="px-1 mb-1">
      {label}
    </span>
  {/if}
  <input
    class="px-4 py-2 border-2 dark:bg-gray-900 border-purple-400 rounded-lg mb-4 focus:outline-none focus:border-purple-500"
    {placeholder}
    {type}
    {name}
    {value}
    id={name}
    on:change
  />
</label>
