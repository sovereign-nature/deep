<template>
  <div>
    <div
      v-for="dt in props.data"
      :key="dt.id"
      class="last:rounded-b-lg last:border-none"
    >
      <div
        v-if="!dt.name"
        class="grid auto-cols-fr grid-flow-col place-items-center border-b-2 border-primary bg-neutral py-4 text-white"
      >
        <div
          v-for="li in dt"
          :key="li"
          class="border-none bg-inherit font-light"
        >
          {{ li }}
        </div>
      </div>
      <NuxtLink
        v-else
        :class="{ 'hover:bg-stone-800': dt.name, 'cursor-default': !dt.name }"
        class="grid auto-cols-fr grid-flow-col place-items-center border-b-2 border-primary bg-neutral py-4 text-white"
        :to="{ path: 'detail', query: { id: dt.id } }"
      >
        <div
          v-for="li in dt"
          :key="li"
          class="border-none bg-inherit font-light"
        >
          {{ li }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Soul } from '~/interfaces/soul'
import { Transaction } from '~/interfaces/transaction'

const props = defineProps({
  data: {
    type: Array as () => Soul[] | Transaction[],
    required: false,
    default: () => [{}]
  }
})
</script>
