<template>
  <div class="w-auto border-collapse overflow-x-auto">
    <TableHeader :data="data"></TableHeader>
    <TableRow :data="results.length > 0 ? results : data"></TableRow>
  </div>
</template>
<script setup lang="ts">
import { Soul } from '~/types/soul'
const data = useSouls()

defineProps({
  results: {
    type: Array as () => Soul[],
    required: false,
    default: () => []
  }
})
</script>
