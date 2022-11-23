<template>
  <div v-if="results && results.length > 0">
    <div
      v-for="soul in results"
      :key="soul.id"
      class="mb-6 rounded-lg border-2 border-primary bg-base-content py-4 px-8 text-white"
    >
      <h1 class="mb-4 text-4xl">{{ soul.name }}</h1>
      <ul>
        <li v-for="(value, key) in soul" :key="key" class="my-2">
          <span>{{ key }}: </span>
          <span v-if="key === 'createdAt' || key === 'updatedAt'">{{
            convertToSimpleFormat(+value!)
          }}</span>
          <span v-else>{{ value ? value : '-' }}</span>
        </li>
        <li class="my-4">
          <NuxtLink class="min-w-full" :to="`/details/${soul.id}`">
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
import { convertToSimpleFormat } from '~/utils/index'

defineProps({
  results: {
    type: Array as () => Soul[],
    required: false,
    default: () => []
  }
})
</script>
