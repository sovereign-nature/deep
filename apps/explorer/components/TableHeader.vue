<template>
  <div
    class="grid grid-cols-6 place-items-center border-b-2 border-primary bg-neutral py-3 text-white"
  >
    <div
      v-for="(value, key) in data[0]"
      :key="key"
      class="bg-inherit font-light text-inherit"
    >
      {{ splitCamelCase(key) }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: ['data'],
  methods: {
    splitCamelCase: function (text: string): string {
      return (
        text.charAt(0).toUpperCase() + text.slice(1).replace(/[A-Z]/g, ' $&')
      )
    }
  }
}
</script>
