<template>
  <div class="w-full border-collapse overflow-x-auto rounded-lg">
    <TableHeader></TableHeader>
    <TableRow :lions="lions"></TableRow>
  </div>
</template>
<script setup>
const lions = useLions()
</script>
