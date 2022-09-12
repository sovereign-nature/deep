<template>
  <div>
    <NuxtLink
      v-for="dt in props.data"
      :key="dt.id"
      class="grid auto-cols-fr grid-flow-col place-items-center border-b-2 border-primary bg-neutral py-4 text-white last:rounded-b-lg last:border-none hover:bg-stone-800"
      :to="{ path: 'detail', query: { id: dt.id } }"
    >
      <div v-for="li in dt" :key="li" class="border-none bg-inherit font-light">
        {{ li }}
      </div>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import { Soul } from './soul'
import { Transaction } from './transaction'

const props = defineProps({
  data: {
    type: Array as () => Soul[] | Transaction[],
    required: false,
    default: () => [{}]
  }
})
</script>
