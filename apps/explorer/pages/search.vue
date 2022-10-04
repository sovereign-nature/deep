<template>
  <div>
    <div class="lg:px-24 lg:pb-12">
      <SNIFilter></SNIFilter>
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
}
</style>
