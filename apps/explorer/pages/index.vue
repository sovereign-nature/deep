<template>
  <div
    class="flex h-screen w-full items-center justify-center bg-landing bg-cover bg-no-repeat"
  >
    <div
      class="container flex max-w-sm flex-col items-center bg-black/50 p-8 text-center text-white md:max-w-lg md:p-16 lg:max-w-screen-md"
    >
      <img class="w-3/12 md:w-2/12" src="~/assets/images/sni-logo.svg" />
      <h1 class="py-12 text-3xl md:text-6xl">Nature Explorer</h1>
      <p class="text-lg md:text-2xl">
        A developer guide for exploring nature's metadata
      </p>
      <NuxtLink class="min-w-full" to="/search">
        <button class="btn btn-primary mt-12 min-w-full">
          Start Exploring
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
