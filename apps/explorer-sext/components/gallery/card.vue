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
        class="max-w-sm rounded-sm border border-gray-200 bg-white dark:border-gray-700 dark:bg-black">
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
