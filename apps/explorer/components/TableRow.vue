<template>
  <div>
    <div v-for="dt in data" :key="dt.id">
      <div
        v-if="!(dt as Soul).owner"
        class="grid auto-cols-fr grid-flow-col place-items-center border-b-2 border-primary bg-neutral py-4 text-white"
      >
        <div
          v-for="li in dt"
          :key="(li as string)"
          class="border-none bg-inherit font-light"
        >
          {{ truncate(li, 10) }}
        </div>
      </div>
      <NuxtLink
        v-else
        class="grid auto-cols-fr grid-flow-col place-items-center border-b-2 border-primary bg-neutral p-4 text-white hover:bg-stone-800"
        :to="{ path: `details/${dt.id}` }"
      >
        <div
          v-for="li in dt"
          :key="(li as string)"
          class="border-none bg-inherit font-light"
        >
          {{ truncate(li, 10) }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Soul } from '~/types/soul'
import { Transaction } from '~/types/transaction'
import { truncate } from '~/utils/index'
defineProps({
  data: {
    type: Array as () => Soul[] | Transaction[],
    required: false,
    default: () => [{}]
  }
})
</script>
