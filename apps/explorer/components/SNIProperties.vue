<template>
  <div class="w-full text-white">
    <h1 class="text-3xl">Properties</h1>
    <div class="my-6 flex w-full">
      <div
        class="mr-2 w-full rounded-xl border border-primary-content bg-primary py-2 px-4"
      >
        <div v-for="(value, key) in properties" :key="key">
          <p>
            <span class="text-sm text-primary-content"
              >{{
                key === 'tokenURI'
                  ? 'Token URI'
                  : splitCamelCase(key.toString())
              }}:
            </span>
            <a
              v-if="key === 'tokenURI'"
              :href="ipfsToUrl(value)"
              target="_blank"
              class="hover:underline"
              >{{
                isResponsive()
                  ? truncate(ipfsToUrl(value), 30)
                  : ipfsToUrl(value)
              }}</a
            >
            <span v-else class="mt-1 ml-2 break-words text-xl text-white">
              {{ value ? value : '-' }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SoulProperty } from '~~/types/soul-property'
import {
  splitCamelCase,
  truncate,
  ipfsToUrl,
  isResponsive
} from '~/utils/index'

defineProps({
  properties: {
    type: Object as () => SoulProperty,
    required: false,
    default: Object as () => SoulProperty
  }
})
</script>
