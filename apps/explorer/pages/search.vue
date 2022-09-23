<template>
  <div>
    <div class="text-white">{{}}</div>
    <div class="lg:px-24 lg:pb-12">
      <SNIFilter />
      <SNITableMobile
        :data="(data.snis as Soul[])"
        class="mx-6 py-12 lg:hidden"
      />
      <SNITable
        :data="(data.snis as Soul[])"
        class="hidden lg:block lg:h-screen lg:w-full lg:py-12"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Soul } from '~~/types/soul'

useGqlCors({ credentials: 'same-origin' })
const { data, error } = await useAsyncGql('sniList', { sniId: '1' })

if (error.value) {
  // eslint-disable-next-line no-console
  console.error(error.value)
}
</script>
