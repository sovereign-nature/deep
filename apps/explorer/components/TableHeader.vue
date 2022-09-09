<template>
  <div
    class="grid grid-flow-col auto-cols-fr place-items-center border-b-2 border-primary bg-neutral py-3 text-white"
  >
    <div
      v-for="(value, key) in props.data[0]"
      :key="key"
      class="bg-inherit font-light text-inherit"
    >
      {{ splitCamelCase(key.toString()) }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { splitCamelCase } from '~/components/utils'
const props = defineProps({
  data: []
})
</script>
