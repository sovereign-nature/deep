<template>
  <div>
    <NuxtLink
      v-for="soul in props.data"
      :key="soul.id"
      class="grid grid-flow-col auto-cols-fr place-items-center border-b-2 border-primary bg-neutral py-4 text-white last:rounded-b-lg last:border-none hover:bg-stone-800"
      :to="{ path: 'detail', query: { id: soul.id } }"
    >
      <div
        v-for="li in soul"
        :key="li"
        class="border-none bg-inherit font-light"
      >
        {{ li }}
      </div>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  data: []
})
</script>
