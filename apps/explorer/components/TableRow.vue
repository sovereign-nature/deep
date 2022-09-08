<template>
  <div>
    <NuxtLink
      v-for="lion in data"
      :key="lion.id"
      class="grid min-w-full grid-cols-6 place-items-center border-b-2 border-primary bg-neutral py-4 text-white last:rounded-b-lg last:border-none hover:bg-stone-800"
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
<script lang="ts">
export default {
  props: ['data']
}
</script>
