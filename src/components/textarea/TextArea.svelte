<script lang="ts">
  export let name = ""
  export let placeholder = ""
  export let cols = 30
  export let rows = 10
  export let label = ""
  export let value: string
</script>

<label for={name} class="flex flex-col">
  {#if label}
    <span class="px-1 mb-1">
      {label}
    </span>
  {/if}
  <textarea
    {name}
    id={name}
    {cols}
    {rows}
    class="px-4 py-2 border-2 dark:bg-gray-900 border-purple-400 rounded-lg mb-4 focus:outline-none focus:border-purple-500"
    {placeholder}
    on:change
    bind:value
  />
</label>
