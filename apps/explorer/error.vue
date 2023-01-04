<template>
  <div
    class="flex h-screen w-full items-center justify-center bg-landing bg-cover bg-no-repeat">
    <div
      class="container flex max-w-sm flex-col items-center bg-black/50 p-8 text-center text-white md:max-w-lg md:p-16 lg:max-w-screen-md">
      <div class="py-4">
        <h1 class="pb-6 text-4xl md:text-8xl">{{ error.statusCode }}</h1>
        <h2 class="text-2xl md:text-4xl">Ooops! something went wrong...</h2>
      </div>
      <p class="text-lg md:text-2xl">
        {{ error.statusMessage }}
      </p>
      <button class="btn-primary btn mt-12 min-w-full" @click="handleError">
        Go back to the main page
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NuxtError } from 'nuxt/dist/app/composables/error';

defineProps({
  error: {
    type: Object as () => NuxtError,
    required: false,
    default: () => Object,
  },
});
const handleError = () => clearError({ redirect: '/' });
</script>

<style lang="scss" scoped></style>
