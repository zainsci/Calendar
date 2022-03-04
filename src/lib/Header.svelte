<script lang="ts">
  import HeaderList from "../components/HeaderList.svelte";

  const yearList = Array.from({ length: 100 }, (_, i) => 1970 + i);
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let isYearOpen = false;
  let isMonthOpen = false;
</script>

<header
  class="w-full h-16 grid grid-cols-4 gap-2 p-3 border-b-2 border-b-gray-500"
>
  <HeaderList
    name={new Date().getFullYear().toString()}
    list={yearList}
    type="year"
  />
  <HeaderList
    name={monthList[new Date().getMonth()]}
    list={monthList}
    type="month"
  />
  <HeaderList name={``} />
  <HeaderList name={`Today`} />
</header>

<style>
</style>
