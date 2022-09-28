<template>
  <div class="w-auto border-collapse overflow-x-auto">
    <TableHeader :data="props.data"></TableHeader>
    <TableRow :data="props.data"></TableRow>
  </div>
</template>
<script setup lang="ts">
import { Transaction } from '~~/types/transaction'
import { Soul } from '~~/types/soul'

const props = defineProps({
  data: {
    type: Array as () => Soul[] | Transaction[],
    required: false,
    default: () => [{}]
  }
})
</script>
