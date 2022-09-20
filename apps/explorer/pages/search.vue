<template>
  <div class="lg:px-24 lg:pb-12">
    <SNIFilter />
    <SNITableMobile :data="souls" class="mx-6 py-12 lg:hidden" />
    <SNITable :data="souls" class="hidden lg:block lg:h-screen lg:w-full" />
  </div>
</template>
<script setup>
const souls = useSouls()
</script>
