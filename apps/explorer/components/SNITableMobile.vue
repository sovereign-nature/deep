<template>
  <div class="flex h-full flex-col gap-6">
    <div
      class="rounded-lg border-2 border-primary bg-base-content py-4 px-8 text-white"
    >
      <h1 class="mb-4 text-4xl">Leo Sabotus</h1>
      <ul>
        <li class="my-2">Id: 001</li>
        <li class="my-2">Conservation status: Preserved Specimen</li>
        <li class="my-2">Created: 01-01-2022</li>
        <li class="my-2">Updated: 12-12-2022</li>
        <li class="my-2">Location: Kenya</li>
        <li class="my-4">
          <NuxtLink class="min-w-full" to="/detail">
            <button class="btn-primary btn min-w-full">Details</button>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div
      class="rounded-lg border-2 border-primary bg-base-content py-4 px-8 text-white"
    >
      <h1 class="mb-4 text-4xl">Leo Supremus</h1>
      <ul>
        <li class="my-2">Id: 002</li>
        <li class="my-2">Conservation status: Preserved Specimen</li>
        <li class="my-2">Created: 01-01-2022</li>
        <li class="my-2">Updated: 12-12-2022</li>
        <li class="my-2">Location: Kenya</li>
        <li class="my-4">
          <NuxtLink class="min-w-full" to="/detail">
            <button class="btn-primary btn min-w-full">Details</button>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
