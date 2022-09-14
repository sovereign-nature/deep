<template>
  <div
    class="grid auto-cols-fr grid-flow-col place-items-center border-b-2 border-primary bg-neutral py-3 text-white"
  >
    <div
      v-for="(value, key) in props.data[0]"
      :key="key"
      class="bg-inherit font-light text-inherit"
    >
      {{ splitCamelCase(key) }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { Soul } from '~/interfaces/soul'
import { Transaction } from '~/interfaces/transaction'
import { splitCamelCase } from '~/utils/index'

const props = defineProps({
  data: {
    type: Array as () => Soul[] | Transaction[],
    required: false,
    default: () => [{}]
  }
})
</script>
