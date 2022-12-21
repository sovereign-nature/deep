<template>
  <div
    class="grid auto-cols-fr grid-flow-col place-items-center rounded-t-lg border-b-2 border-primary bg-neutral py-3 text-white">
    <div
      v-for="(value, key) in data[0]"
      :key="key"
      class="bg-inherit font-light text-inherit">
      {{ splitCamelCase(key) }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { splitCamelCase } from '~/utils/index';

defineProps({
  data: {
    type: Array as () => unknown[],
    required: false,
    default: () => [{}],
  },
});
</script>
