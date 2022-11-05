<template>
  <div class="w-full text-white">
    <h1 class="text-3xl">Properties</h1>
    <div class="my-6 flex w-full">
      <div
        class="mr-2 w-full rounded-xl border border-primary-content bg-primary py-2 px-4 text-center"
      >
        <div v-for="(value, key) in properties" :key="key">
          <p class="text-sm text-primary-content">
            {{ splitCamelCase(key.toString()) }}
          </p>
          <p class="mt-1 break-words text-xl text-white">
            {{ value ? value : '-' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SoulProperty } from '~~/types/soul-property'
import { splitCamelCase } from '~/utils/index'

defineProps({
  properties: {
    type: Object as () => SoulProperty,
    required: false,
    default: Object as () => SoulProperty
  }
})
</script>
