<script lang="ts">
  export let placeholder: string
  export let name: string
  export let value: string
  export let label = ""
  export let error: boolean
</script>

<label for={name} class="flex flex-col">
  {#if label !== ""}
    <span class="px-1 mb-1">
      {label}
    </span>
  {/if}
  <input
    class={`px-4 py-2 border-2 dark:bg-gray-900 border-purple-400 rounded-lg mb-4 focus:outline-none focus:border-purple-500 ${
      error ? " border-red-500" : ""
    }`}
    {placeholder}
    {name}
    id={name}
    type="text"
    on:change
    bind:value
  />
</label>
