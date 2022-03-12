<script lang="ts">
  import "./css/app.css"

  import Frame from "./components/Frame.svelte"

  import Header from "./components/Header.svelte"
  import Main from "./components/Main.svelte"
  import SideBar from "./components/SideBar.svelte"
</script>

<svelte:head>
  <title>Home - Calendar</title>
</svelte:head>

<div class="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
  <Frame />
  <Header />
  <main class="w-full grid grid-cols-4">
    <Main />
    <SideBar />
  </main>
</div>

<style type="text/scss">
</style>
