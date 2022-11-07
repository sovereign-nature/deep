<template>
  <div>
    <FilterMobile
      tabindex="1"
      class="collapse collapse-arrow bg-neutral text-white lg:hidden"
      :search-by-parameter="searchByParameter"
    ></FilterMobile>
    <FilterDesktop
      class="hidden w-full py-12 lg:flex"
      :search-by-parameter="searchByParameter"
    ></FilterDesktop>
  </div>
</template>
<script setup lang="ts">
import { FilterParameters } from '~~/types/filter-parameters'
import { Soul } from '~~/types/soul'
const emit = defineEmits(['searchFilter'])
let filteredResults = $ref([])
const router = useRouter()
const souls = $ref(useSouls())
const filterParameters = $ref({} as FilterParameters)

function filterResults(filter): void {
  filteredResults = souls

  router.push({
    query: {
      idNameOwner: filterParameters.idNameOwner,
      status: filterParameters.status,
      createdDate: filterParameters.createdDate,
      updatedDate: filterParameters.updatedDate
    }
  })

  filteredResults = filteredResults.filter((soul) => {
    if (filter === 'idNameOwner') {
      return (
        soul.id?.includes(filterParameters[filter]) ||
        soul.name?.includes(filterParameters[filter]) ||
        soul.owner?.includes(filterParameters[filter])
      )
    } else if (filter === 'createdDate' || filter === 'updatedDate') {
      soul[filter]?.toString().includes(filterParameters[filter].getTime())
    } else if (filter === 'status') {
      return soul.status === filterParameters[filter]
    }

    return null
  })

  emit('searchFilter', filteredResults as Soul[])
}

function searchByParameter(event, filterParam): void {
  const searchTerm =
    filterParam === 'createdDate' || filterParam === 'updatedDate'
      ? event
      : event?.target?.value
  filterParameters[filterParam] = searchTerm

  if (event !== null) {
    filterResults(filterParam)
  }
}
</script>
<style lang="scss"></style>
