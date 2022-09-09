<template>
  <div>
    <NuxtLink
      v-for="lion in props.data"
      :key="lion.id"
      class="grid grid-flow-col auto-cols-fr place-items-center border-b-2 border-primary bg-neutral py-4 text-white last:rounded-b-lg last:border-none hover:bg-stone-800"
      :to="{ path: 'detail', query: { id: lion.id } }"
    >
      <div
        v-for="li in lion"
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
