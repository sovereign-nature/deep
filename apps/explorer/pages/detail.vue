<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 px-8 py-12 lg:gap-12 lg:p-32">
    <div
      class="image self-center row-span w-full h-64 md:h-96 lg:h-full rounded-lg bg-cover bg-no-repeat bg-leo"
    ></div>
    <div class="lg:col-span-2">
      <SNIDetails class="my-6 lg:my-0"></SNIDetails>
      <SNITransactions class="my-6 lg:mt-6 w-100"></SNITransactions>
    </div>
    <div class="col-span-full">
      <h1 class="text-white text-3xl my-6">Identification place</h1>
      <SNIMap class="rounded-lg border-2 border-primary"></SNIMap>
    </div>
  </div>
</template>
<style>
.image {
  background-position: 35%;
}
</style>
