<template>
  <div>
    <FilterMobile
      tabindex="1"
      class="collapse collapse-arrow bg-neutral text-white lg:hidden"
      @search-filter="handleSearchFilter"
    ></FilterMobile>
    <FilterDesktop
      class="hidden w-full py-12 lg:flex"
      @search-filter="handleSearchFilter"
    ></FilterDesktop>
    {{ result }}
  </div>
</template>
<script setup lang="ts">
import { Soul } from '~~/types/soul'
const emit = defineEmits(['searchFilter'])
let result = $ref([])

function handleSearchFilter(s) {
  result = s
  emit('searchFilter', result)
}

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
