<template>
  <div>
    <NuxtLink
      v-for="lion in lions"
      :key="lion.id"
      class="grid min-w-full grid-cols-6 place-items-center border-b-2 border-primary bg-neutral py-4 text-white last:rounded-b-lg last:border-none hover:bg-stone-800"
      :to="{ path: 'detail', query: { id: lion.id } }"
    >
      <div class="border-none bg-inherit font-light">{{ lion.id }}</div>
      <div class="border-none bg-inherit font-light">{{ lion.name }}</div>
      <div class="border-none bg-inherit font-light">
        <span class="rounded-md border p-1">{{ lion.conservationStatus }}</span>
      </div>
      <div class="border-none bg-inherit font-light">{{ lion.created }}</div>
      <div class="border-none bg-inherit font-light">{{ lion.updated }}</div>
      <div class="border-none bg-inherit font-light">{{ lion.location }}</div>
    </NuxtLink>
  </div>
</template>
<script lang="ts">
export default {
  props: ['lions']
}
</script>
