<template>
  <div class="flex h-full flex-col gap-6">
    <div
      v-for="dt in props.data"
      :key="dt.id"
      class="rounded-lg border-2 border-primary bg-base-content py-4 px-8 text-white"
    >
      <h1 class="mb-4 text-4xl">{{ dt.name }}</h1>
      <ul>
        <li class="my-2">Id: {{ dt.id }}</li>
        <li class="my-2">Conservation status: {{ dt.conservationStatus }}</li>
        <li class="my-2">Created: {{ dt.created }}</li>
        <li class="my-2">Updated: {{ dt.updated }}</li>
        <li class="my-2">Location: {{ dt.location }}</li>
        <li class="my-4">
          <NuxtLink class="min-w-full" :to="{ path: `details/${dt.id}` }">
            <button class="btn-primary btn min-w-full">Details</button>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Soul } from '~/interfaces/soul'

const props = defineProps({
  data: {
    type: Array as () => Soul[],
    required: false,
    default: () => [{}]
  }
})
</script>
