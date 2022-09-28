<template>
  <div class="w-full text-white">
    <h1 class="text-3xl">Details</h1>
    <div
      class="mt-6 w-full rounded-lg border-2 border-primary bg-base-content py-4 px-8"
    >
      <h1 class="mb-4 text-4xl">{{ props.detail.name }}</h1>
      <ul>
        <li v-for="(value, key) in detail" :key="key" class="my-2">
          {{ splitCamelCase(key.toString()) }}: {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Soul } from '~/types/soul'
import { splitCamelCase } from '~/utils/index'

const props = defineProps({
  detail: {
    type: Object as () => Soul,
    required: false,
    default: Object as () => Soul
  }
})
</script>
