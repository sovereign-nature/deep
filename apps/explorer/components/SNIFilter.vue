<template>
  <div>
    <FilterMobile
      tabindex="1"
      class="collapse collapse-arrow bg-neutral text-white lg:hidden"
    ></FilterMobile>
    <FilterDesktop class="hidden w-full py-12 lg:flex"></FilterDesktop>
  </div>
</template>
<script lang="ts" setup>
import { Soul } from '~~/types/soul'

defineProps({
  details: {
    type: Array as () => Soul[],
    required: false,
    default: () => [{}]
  }
})
// TODO: Make this works for both filter components and props
// const createdDate = ref([])
// const updatedDate = ref([])
</script>
<style lang="scss"></style>
