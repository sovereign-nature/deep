<template>
  <div class="flex flex-col gap-6 h-full">
    <div
      class="border-2 rounded-lg border-primary py-4 px-8 bg-base-content text-white"
    >
      <h1 class="text-4xl mb-4">Leo Sabotus</h1>
      <ul>
        <li class="my-2">Id: 001</li>
        <li class="my-2">Conservation status: Preserved Specimen</li>
        <li class="my-2">Created: 01-01-2022</li>
        <li class="my-2">Updated: 12-12-2022</li>
        <li class="my-2">Location: Kenya</li>
        <li class="my-4">
          <NuxtLink class="min-w-full" to="/detail">
            <button class="btn btn-primary text-md min-w-full">Details</button>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div
      class="border-2 rounded-lg border-primary py-4 px-8 bg-base-content text-white"
    >
      <h1 class="text-4xl mb-4">Leo Supremus</h1>
      <ul>
        <li class="my-2">Id: 002</li>
        <li class="my-2">Conservation status: Preserved Specimen</li>
        <li class="my-2">Created: 01-01-2022</li>
        <li class="my-2">Updated: 12-12-2022</li>
        <li class="my-2">Location: Kenya</li>
        <li class="my-4">
          <NuxtLink class="min-w-full" to="/detail">
            <button class="btn btn-primary text-md min-w-full">Details</button>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
