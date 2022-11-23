<template>
  <div class="overflow-hidden rounded-lg">
    <div :class="{ blur: pending }" class="flex md:justify-center lg:pr-20">
      <img
        :src="ipfsToUrl(image as string)"
        :alt="imageAlt"
        class="rounded-lg opacity-100 transition-opacity duration-500 ease-in-out md:max-w-lg lg:max-w-full"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ipfsToUrl } from '~/utils/index'

defineProps({
  image: {
    type: String,
    required: false,
    default: ''
  },
  imageAlt: {
    type: String,
    required: false,
    default: ''
  },
  pending: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
