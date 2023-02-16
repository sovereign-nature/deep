<!-- eslint-disable vue/no-multiple-template-root -->
#TODO: Fix layout
<script setup>
useHead({
  title: 'Sovereign Nature Identifier',
  meta: [
    {
      name: 'description',
      content: 'Dashboard page',
    },
  ],
  bodyAttrs: {
    class: 'bg-black h-screen',
  },
});
</script>

<template>
  <DashboardSidebar />
  <div class="p-4 sm:ml-64">
    <NuxtLoadingIndicator />
    <NuxtPage />
  </div>
</template>
