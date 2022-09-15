<template>
  <div class="w-auto border-collapse overflow-x-auto rounded-lg">
    <TableHeader :data="props.data"></TableHeader>
    <TableRow :data="props.data"></TableRow>
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
