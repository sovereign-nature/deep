<template>
  <div class="px-8 py-12 lg:gap-12 lg:p-32">
    <NuxtLink to="/" class="mb-5 block text-primary hover:underline"
      >Back to main page</NuxtLink
    >
    <div class="flex flex-col lg:flex-row">
      <SNIImage
        v-if="detail.image"
        :image="detail.image"
        :image-alt="detail.id"
        :pending="pending"
        class="justify-self-center"
      ></SNIImage>
      <SNIDetails :detail="(detail as Soul)" class="my-6 lg:my-0"></SNIDetails>
      <!-- <SNITransactions class="my-6 lg:mt-6"></SNITransactions> -->
    </div>
    <div v-if="sniProperties" class="col-span-full">
      <SNIProperties
        :properties="(sniProperties as SoulProperty)"
        class="my-6 lg:mt-6"
      ></SNIProperties>
    </div>
    <div v-if="geometry" class="col-span-full">
      <h1 class="my-6 text-3xl text-white">Identification place</h1>
      <SNIMap
        :geometry="geometry"
        class="rounded-lg border-2 border-primary"
      ></SNIMap>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { Soul } from '~~/types/soul'
import { SoulProperty } from '~~/types/soul-property'

useGqlCors({ credentials: 'same-origin' })
const route = useRoute()

const { pending, data, error } = await useAsyncGql('sniDetail', {
  sniId: route.params.id.toString()
})

const {
  statusDescription,
  tokenURI,
  tokenId,
  taxonId,
  conservationStatus,
  geometry,
  ...detail
} = data.value.sni

const sniProperties = {
  statusDescription,
  tokenURI,
  tokenId,
  taxonId,
  conservationStatus,
  geometry
} as SoulProperty

if (error.value) {
  // eslint-disable-next-line no-console
  console.error(error.value)
}

useHead({
  title: `SNI - Detail - ${detail.id}`
})
</script>
