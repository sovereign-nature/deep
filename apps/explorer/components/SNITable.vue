<template>
  <div class="w-full border-collapse overflow-x-auto rounded-lg">
    <TableHeader :data="data"></TableHeader>
    <TableRow :data="data"></TableRow>
  </div>
</template>
<script lang="ts">
export default {
  props: ['data']
}
</script>
