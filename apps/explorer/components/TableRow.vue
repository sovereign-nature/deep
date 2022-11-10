<template>
  <div>
    <div v-for="dt in data" :key="dt.id">
      <div
        v-if="!(dt as Soul).owner"
        class="grid auto-cols-fr grid-flow-col place-items-center border-b-2 border-primary bg-neutral py-4 text-white"
      >
        <div
          v-for="li in dt"
          :key="(li as string)"
          class="border-none bg-inherit font-light"
        >
          {{ truncate(li, 10) }}
        </div>
      </div>
      <NuxtLink
        v-else
        class="grid auto-cols-fr grid-flow-col place-items-center border-b-2 border-primary bg-neutral p-4 text-white hover:bg-stone-800"
        :to="{ path: `details/${dt.id}` }"
      >
        <div
          v-for="(val, key) in dt"
          :key="(val as string)"
          class="border-none bg-inherit font-light"
          :class="
            key === 'createdAt' || key === 'updatedAt'
              ? 'text-center'
              : 'text-left'
          "
        >
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
import { toDate, format } from 'date-fns'
import { truncate } from '~/utils/index'
import { Soul } from '~/types/soul'
import { Transaction } from '~/types/transaction'

function convertToSimpleFormat(date: number): string {
  const convertedDate = toDate(date)
  const simpleFormatDate = format(convertedDate, 'MM/dd/yyyy')
  const simpleFormatHour = format(convertedDate, 'HH:mm:ss')

  return `${simpleFormatDate} | ${simpleFormatHour}`
}

defineProps({
  data: {
    type: Array as () => Soul[] | Transaction[],
    required: false,
    default: () => [{}]
  }
})
</script>
