<template>
  <div class="grid grid-cols-1 px-8 py-12 lg:grid-cols-3 lg:gap-12 lg:p-32">
    <div
      class="image row-span h-64 w-full self-center rounded-lg bg-leo bg-cover bg-no-repeat md:h-96 lg:h-full"
    ></div>
    <div class="lg:col-span-2">
      <SNIDetails class="my-6 lg:my-0"></SNIDetails>
      <SNITransactions class="w-100 my-6 lg:mt-6"></SNITransactions>
    </div>
    <div class="col-span-full">
      <h1 class="my-6 text-3xl text-white">Identification place</h1>
      <SNIMap class="rounded-lg border-2 border-primary"></SNIMap>
    </div>
  </div>
</template>
<style>
.image {
  background-position: 35%;
}
</style>
