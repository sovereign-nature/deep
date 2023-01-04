<template>
  <div class="w-auto border-collapse overflow-x-auto">
    <div v-if="results && results.length > 0">
      <TableHeader :data="results"></TableHeader>
      <TableRow :data="results"></TableRow>
    </div>
    <div v-else>
      <h2 class="text-center text-2xl text-white">
        Sorry, no results found for your research
      </h2>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Soul } from '~/types/soul';

defineProps({
  results: {
    type: Array as () => Soul[],
    required: false,
    default: () => [],
  },
});
</script>
