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
const props = defineProps({
  data: []
})
const splitCamelCase = function (text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).replace(/[A-Z]/g, ' $&')
}
</script>
