<script setup lang="ts">
function submit(id: string) {
  console.log(id);
  navigateTo(`/${id}`);
}
</script>

<template>
  <UCard>
    <template #header />
    <UContainer>
      <UInput
        placeholder="Search..."
        icon="i-heroicons-magnifying-glass-20-solid"
        size="sm"
        color="gray"
        @keyup.enter="(e:InputEvent) => submit((e.target as HTMLInputElement).value)" />
    </UContainer>
    <template #footer />
  </UCard>
</template>
