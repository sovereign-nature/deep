<template>
  <div>
    <Script :async="true"></Script>
    <div class="lg:px-24 lg:pb-12">
      <div v-for="snis in data" :key="snis.id">
        <div>{{ snis }}</div>
      </div>
      <SNIFilter />
      <SNITableMobile :data="souls" class="mx-6 py-12 lg:hidden" />
      <SNITable :data="souls" class="hidden lg:block lg:h-screen lg:w-full" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const souls = useSouls()
useGqlCors({ credentials: 'same-origin' })
const { data, error } = await useAsyncGql('sniList', { sniId: '1' })

if (error.value) {
  // eslint-disable-next-line no-console
  console.error(error.value)
}
</script>
