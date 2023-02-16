<script setup lang="ts">
defineProps<{ label: string }>();
</script>
<template>
  <li>
    <div
      class="flex items-center rounded-sm p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900">
      <slot></slot>
      <span class="ml-3">{{ label }}</span>
    </div>
  </li>
</template>
