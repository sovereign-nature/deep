<template>
  <div>
    <FilterMobile
      tabindex="1"
      class="collapse collapse-arrow rounded-lg bg-base-content text-white lg:hidden"
      :search-by-parameter="searchByParameter"
    ></FilterMobile>
    <FilterDesktop
      class="hidden w-full py-12 lg:flex"
      :search-by-parameter="searchByParameter"
    ></FilterDesktop>
  </div>
</template>
<script setup lang="ts">
import { getTime } from 'date-fns'
import { FilterParameters } from '~~/types/filter-parameters'
import { Soul } from '~~/types/soul'

const emit = defineEmits(['searchFilter'])
let filteredResults: Soul[] | undefined
const souls = $ref(useSouls())
// const router = useRouter()
// const filterParameters: FilterParameters = $ref({} as FilterParameters)

async function filterResults(filter: string, searchValue: any): Promise<void> {
  filteredResults = souls
  if (searchValue !== '') {
    if (filter === 'idNameOwner') {
      const filterId = (await useAsyncGql('sniFilterId', { id: searchValue }))
        .data.value?.snis as Soul[]
      if (filterId?.length > 0) {
        filteredResults = filterId
      } else {
        const filterOwner = (
          await useAsyncGql('sniFilterOwner', { owner: searchValue })
        ).data.value?.snis as Soul[]
        if (filterOwner?.length > 0) {
          filteredResults = filterOwner
        } else {
          filteredResults = (
            await useAsyncGql('sniFilterName', { name: searchValue })
          ).data.value?.snis as Soul[]
        }
      }
    } else if (filter === 'status') {
      filteredResults = (
        await useAsyncGql('sniFilterStatus', { status: searchValue })
      ).data.value?.snis as Soul[]
    } else if (filter === 'createdAt') {
      filteredResults = (
        await useAsyncGql('sniFilterCreatedAt', {
          createdAt: getTime(+searchValue / 1000)
        })
      ).data.value?.snis as Soul[]
    } else if (filter === 'updatedAt') {
      filteredResults = (
        await useAsyncGql('sniFilterUpdatedAt', {
          updatedAt: getTime(+searchValue / 1000)
        })
      ).data.value?.snis as Soul[]
    }
  } else {
    filteredResults = souls
  }
  // TODO: Implement query search
  // router.push({
  //   query: {
  //     idNameOwner: filterParameters.idNameOwner,
  //     status: filterParameters.status,
  //     createdAt: getTime(+filterParameters.createdAt / 1000),
  //     updatedAt: getTime(+filterParameters.updatedAt / 1000)
  //   }
  // })

  emit('searchFilter', filteredResults as Soul[])
}

function searchByParameter(
  event: Event,
  filterParam: keyof FilterParameters
): void {
  const searchTerm =
    filterParam === 'createdAt' || filterParam === 'updatedAt'
      ? event
      : (event?.target as HTMLInputElement)?.value
  // filterParameters[filterParam] = searchTerm as keyof FilterParameters
  filterResults(filterParam, searchTerm)

  // if (event !== null) {
  //   filterResults(filterParam, searchTerm)
  // }
}
</script>
<style lang="scss"></style>
