<template>
  <div class="w-auto border-collapse overflow-x-auto rounded-lg">
    <TableHeader :data="props.data"></TableHeader>
    <TableRow :data="props.data"></TableRow>
  </div>
</template>
<script setup lang="ts">
import { Soul } from '~/types/soul'
import { Transaction } from '~/types/transaction'

const props = defineProps({
  data: {
    type: Array as () => Soul[] | Transaction[],
    required: false,
    default: () => [{}]
  }
})
</script>
