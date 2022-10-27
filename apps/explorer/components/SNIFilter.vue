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
// TODO: Make this works for both filter components and props
// const createdDate = ref([])
// const updatedDate = ref([])

function filterResults(filter) {
  filteredResults = souls

  router.push({
    query: {
      [filter]: filterParameters[filter]
    }
  })

  filteredResults = filteredResults.filter((soul) => {
    if (filter === 'idNameOwner') {
      return soul['id' || 'name' || 'owner'].includes(filterParameters[filter])
    } else if (filter === 'createdDate' || filter === 'updatedDate') {
      soul[filter].toString().includes(filterParameters[filter])
    } else {
      return soul.status === +filterParameters[filter]
    }

    return null
  })

  emit('searchFilter', filteredResults as Soul[])
}

function searchByParameter(event, filterParam): void {
  const searchTerm = event.target.value
  filterParameters[filterParam] = searchTerm

  filterResults(filterParam)
}
</script>
<style lang="scss"></style>
