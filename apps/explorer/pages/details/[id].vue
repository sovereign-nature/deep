<template>
  <div class="grid grid-cols-1 px-8 py-12 lg:grid-cols-3 lg:gap-12 lg:p-32">
    <div
      class="h-64 w-full self-center rounded-lg bg-leo bg-cover bg-center bg-no-repeat md:h-96 lg:h-full"
    ></div>
    <div class="lg:col-span-2">
      <SNIDetails :detail="(detail as Soul)" class="my-6 lg:my-0"></SNIDetails>
      <SNIProperties
        :properties="(sniProperties as SoulProperty)"
        class="my-6 lg:mt-6"
      ></SNIProperties>
      <!-- <SNITransactions class="my-6 lg:mt-6"></SNITransactions> -->
    </div>
    <div class="col-span-full">
      <h1 class="my-6 text-3xl text-white">Identification place</h1>
      <SNIMap class="rounded-lg border-2 border-primary"></SNIMap>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { Soul } from '~~/types/soul'
import { SoulProperty } from '~~/types/soul-property'

// const souls = useSouls()
useGqlCors({ credentials: 'same-origin' })
const route = useRoute()

const { data, error } = await useAsyncGql('sniList', {
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
</script>
