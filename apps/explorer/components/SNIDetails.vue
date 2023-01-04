<template>
  <div class="w-full text-white">
    <h1 class="text-3xl">Details</h1>
    <div
      class="mt-6 w-full rounded-lg border-2 border-primary bg-base-content py-4 px-8">
      <h1 class="mb-4 text-4xl">{{ detail.name }}</h1>
      <ul>
        <li v-for="(value, key) in detail" :key="key" class="my-2">
          <div v-if="key !== 'image'">
            <span> {{ splitCamelCase(key.toString()) }}: </span>
            <a
              v-if="key === 'owner'"
              :href="`${config.public.blockExplorer}${value}`"
              target="_blank"
              class="hover:underline"
              >{{ isResponsive() ? truncate(value, 20) : value }}</a
            >
            <span v-else-if="key === 'createdAt' || key === 'updatedAt'">{{
              convertToSimpleFormat(+value!)
            }}</span>
            <span v-else>{{ value ? value : '-' }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Soul } from '~/types/soul';
import {
  splitCamelCase,
  truncate,
  convertToSimpleFormat,
  isResponsive,
} from '~/utils/index';
const config = useRuntimeConfig();

defineProps({
  detail: {
    type: Object as () => Soul,
    required: false,
    default: Object as () => Soul,
  },
});
</script>
