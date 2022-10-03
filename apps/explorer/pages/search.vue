<template>
  <div>
    <div class="lg:px-24 lg:pb-12">
      <!-- <SNIFilter /> -->
      <SNITableMobile
        :data="(details as Soul[])"
        class="mx-6 py-12 lg:hidden"
      />
      <SNITable
        :data="(details as Soul[])"
        class="hidden lg:block lg:h-screen lg:w-full lg:py-12"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Soul } from '~~/types/soul'

useGqlCors({ credentials: 'same-origin' })
const { data, error } = await useAsyncGql('sniList', { sniId: '1' })
const details = data.value.snis

if (error.value) {
  // eslint-disable-next-line no-console
  console.error(error.value)
}

useHead({
  title: 'Search page'
})
</script>
