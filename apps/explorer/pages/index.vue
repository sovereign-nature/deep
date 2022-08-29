<template>
  <div
    class="flex items-center w-full justify-center h-screen bg-landing bg-no-repeat bg-cover"
  >
    <div
      class="container p-8 md:p-16 flex flex-col max-w-sm md:max-w-lg lg:max-w-screen-md items-center text-center text-white bg-black/50"
    >
      <img class="w-3/12 md:w-2/12" src="~/assets/images/sni-logo.svg" />
      <h1 class="text-3xl py-12 md:text-6xl">Nature Explorer</h1>
      <p class="text-lg md:text-2xl">
        A developer guide for exploring nature’s metadata
      </p>
      <NuxtLink class="min-w-full" to="/search">
        <button class="btn btn-primary mt-12 text-md min-w-full">
          Start Exploring
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
