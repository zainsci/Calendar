<script lang="ts">
  import "./css/app.css"

  import Frame from "./lib/Frame.svelte"

  import Header from "./lib/Header.svelte"
  import Main from "./lib/Main.svelte"
  import SideBar from "./lib/SideBar.svelte"
</script>

<svelte:head>
  <title>Home - Calendar</title>
</svelte:head>

<div class="text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900">
  <Frame />
  <Header />
  <main class="w-full grid grid-cols-4">
    <Main />
    <SideBar />
  </main>
</div>

<style type="text/scss">
</style>
