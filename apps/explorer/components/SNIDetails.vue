<template>
  <div class="w-full text-white">
    <h1 class="text-3xl">Details</h1>
    <div
      class="mt-6 w-full rounded-lg border-2 border-primary bg-base-content py-4 px-8"
    >
      <h1 class="mb-4 text-4xl">{{ detail[0].name }}</h1>
      <ul>
        <li v-for="(value, key) in detail[0]" :key="key" class="my-2">
          {{ splitCamelCase(key) }}: {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: ['detail'],
  methods: {
    splitCamelCase: function (text: string): string {
      return (
        text.charAt(0).toUpperCase() + text.slice(1).replace(/[A-Z]/g, ' $&')
      )
    }
  }
}
</script>
