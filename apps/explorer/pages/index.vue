<template>
  <div class="flex h-full min-h-screen justify-center lg:h-screen">
    <div v-if="error" class="mt-20">
      <SNIAlert
        class="delay-700 duration-500 ease-in-out"
        :class="{
          'opacity-0': !isActive
        }"
      />
    </div>
    <div v-else class="mt-10 px-10">
      <SNIFilter @search-filter="handleSearchFilter"></SNIFilter>
      <SNITableMobile
        :results="result ? result : souls"
        class="py-12 lg:hidden"
      />
      <SNITable :results="result ? result : souls" class="hidden lg:block" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Soul } from '~~/types/soul'

useGqlCors({ credentials: 'same-origin' })
const { data, error } = await useAsyncGql('sniList')
let details: Soul[] = []
const isActive = ref(false)
let souls = ref([] as Soul[])
let result = $ref(null as null | Soul[])

if (error.value) {
  isActive.value = true
  displayErrorMessage()
} else {
  details = data?.value?.snis as Soul[]
  souls = useSouls(details as Soul[])
}

function displayErrorMessage() {
  isActive.value = true

  setTimeout(() => {
    isActive.value = false
  }, 5000)
}

function handleSearchFilter(s: Soul[]) {
  result = s
}

useHead({
  title: 'SNI - Identifier'
})
</script>
<style lang="scss">
@import '@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss';
// datepicker customization
.dp__theme_dark {
  --dp-background-color: #5d5656;
  --dp-text-color: #ffffff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #ffffff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #5c7f67;
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: #ecf4e7;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #ffffff;
  --dp-disabled-color: #737373;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #aae6b9;
  --dp-success-color-disabled: #5c7f67;
  --dp-icon-color: #ffffff;
  --dp-danger-color: #e53935;
  --dp-highlight-color: rgba(0, 92, 178, 0.2);

  .dp__input_wrap {
    .dp__input {
      border-radius: 50px;
      border: none;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      &::placeholder {
        color: #ffffff;
        opacity: 1;
        font-weight: 600;
        font-size: 0.875rem;
      }
    }
  }
}
</style>
