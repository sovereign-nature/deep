<script setup lang="ts">
import _ from 'lodash';
import { useRoute } from 'vue-router';
import { getLion } from '~~/queries';

const {
  params: { tokenId },
} = useRoute();

const { data: tokenData } = await useAsyncQuery<any>(getLion, {
  id: `0x${tokenId}`,
});

const { data: metadata } = await useFetch<any>(
  prepareURL(tokenData.value.sni.tokenURI)
);

const statusDescription = JSON.parse(
  metadata.value.properties.statusDescription
);
</script>
<template>
  <div class="flex flex-row">
    <div class="basis-1/2">
      <figure class="max-w-lg">
        <img
          class="h-auto max-w-full rounded-sm"
          :src="tokenData ? prepareURL(tokenData.sni.image) : ''" />
        <figcaption
          class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          {{ tokenData.sni.description || 'Loading' }}
        </figcaption>
      </figure>
      <ClientOnly>
        <TokenMap />
      </ClientOnly>
    </div>
    <div class="basis-1/2">
      <h1 class="text-5xl font-extrabold dark:text-white">
        {{ _.capitalize(tokenData.sni.name || '') }}
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400"></p>
      <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        Status: {{ statusDescription[tokenData.sni.status] || 'Loading' }}
      </h3>
      <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        Conservation Status:
        {{ metadata ? metadata.properties.conservationStatus : 'Loading' }}
      </h3>
      <TokenAttributes :attributes="metadata.attributes" />
    </div>
  </div>
</template>
