<template>
  <div>
    <div v-for="dt in data" :key="dt.id">
      <div
        v-if="!(dt as Soul).owner"
        class="grid auto-cols-fr grid-flow-col place-items-center border-b-2 border-primary bg-neutral py-4 text-white">
        <div
          v-for="(val, key) in dt"
          :key="val"
          class="border-none bg-inherit font-light"
          :class="
            key === 'createdAt' || key === 'updatedAt'
              ? 'text-center break-all'
              : 'text-left'
          ">
          {{
            key === 'createdAt' || key === 'updatedAt'
              ? convertToSimpleFormat(+val!)
              : truncate(val, 10)
          }}
        </div>
      </div>
      <NuxtLink
        v-else
        class="grid auto-cols-fr grid-flow-col place-items-center border-b-2 border-primary bg-neutral p-4 text-white hover:bg-stone-800"
        :to="`/details/${dt.id}`">
        <div
          v-for="(val, key) in dt"
          :key="(val as string)"
          class="border-none bg-inherit font-light"
          :class="
            key === 'createdAt' || key === 'updatedAt'
              ? 'text-center max-w-[80%]'
              : 'text-left'
          ">
          {{
            key === 'createdAt' || key === 'updatedAt'
              ? convertToSimpleFormat(+val!)
              : truncate(val, 10)
          }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { truncate, convertToSimpleFormat } from '~/utils/index';
import { Soul } from '~/types/soul';
import { Transaction } from '~/types/transaction';

defineProps({
  data: {
    type: Array as () => Soul[] | Transaction[],
    required: false,
    default: () => [{}],
  },
});
</script>
