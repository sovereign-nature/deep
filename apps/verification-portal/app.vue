<script setup lang="ts">
useHead({
  title: 'DEEP Verification Portal',
  meta: [
    {
      name: 'description',
      content: 'Search for a DEEP verification ID',
    },
  ],
  bodyAttrs: {
    class: 'bg-black h-screen',
  },
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </div>
</template>
