<script setup lang="ts">
defineProps<{
  imageUrl: string;
  title: string;
  description?: string;
  pageUrl: string;
}>();
</script>

<template>
  <div>
    <NuxtLink :to="pageUrl">
      <div
        class="max-w-sm bg-white border border-gray-200 rounded-sm dark:bg-black dark:border-gray-700">
        <img loading="lazy" class="rounded-t-sm" :src="imageUrl" alt="" />
        <div class="p-5">
          <h1 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            {{ title }}
          </h1>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
