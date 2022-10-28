<template>
  <div v-if="results && results.length > 0" class="flex h-full flex-col gap-6">
    <div
      v-for="soul in results"
      :key="soul.id"
      class="rounded-lg border-2 border-primary bg-base-content py-4 px-8 text-white"
    >
      <h1 class="mb-4 text-4xl">{{ soul.name }}</h1>
      <ul>
        <li v-for="(value, key) in soul" :key="key" class="my-2">
          {{ key }}: {{ value }}
        </li>
        <li class="my-4">
          <NuxtLink class="min-w-full" :to="{ path: `details/${soul.id}` }">
            <button class="btn-primary btn min-w-full">Details</button>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="h-screen">
    <h2 class="text-center text-2xl text-white">
      Sorry, no results found for your research
    </h2>
  </div>
</template>
<script setup lang="ts">
import { Soul } from '~/types/soul'

defineProps({
  results: {
    type: Array as () => Soul[],
    required: false,
    default: () => []
  }
})
</script>
