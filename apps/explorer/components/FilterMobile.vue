<template>
  <div>
    <input type="checkbox" class="peer" />
    <div class="collapse-title w-full text-xl">Filters</div>
    <div class="collapse-content border-t-2">
      <form class="mt-6">
        <div
          class="relative w-full rounded-full border-2 border-white bg-neutral p-3"
        >
          <input
            id="default-search"
            type="search"
            class="block h-full w-full rounded-full bg-inherit pl-4 text-sm text-white placeholder:text-white focus:outline-none"
            placeholder="Search by Id, Owner or Name..."
            required
            @input="searchByParameter($event, 'idNameOwner')"
          />
        </div>
        <div class="mt-6 flex flex-col gap-4 md:flex-row">
          <select
            class="select rounded-full border-2 border-accent bg-neutral text-white"
            @input="searchByParameter($event, 'status')"
          >
            <option disabled selected class="text-white" value="0">
              Conservation status
            </option>
            <option value="85">Preserved specimen</option>
            <option value="31">Human observation</option>
            <option value="88">Machine observation</option>
          </select>
          <Datepicker
            v-model="createdDate"
            dark
            placeholder="Created at"
            class="rounded-full border-2 border-accent bg-neutral text-white"
            @input="searchByParameter($event, 'createdDate')"
          />
          <Datepicker
            v-model="updatedDate"
            dark
            placeholder="Updated at"
            class="rounded-full border-2 border-accent bg-neutral text-white"
            @input="searchByParameter($event, 'updatedDate')"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'
import { Soul } from '~~/types/soul'
import { FilterParameters } from '~~/types/filter-parameters'

const router = useRouter()
const emit = defineEmits(['searchFilter'])
const souls = $ref(useSouls())
const createdDate = ref([])
const updatedDate = ref([])
let filteredResults = $ref([])
const filterParameters = $ref({} as FilterParameters)

function filterResults(filter) {
  filteredResults = souls

  router.push({
    query: {
      filter: filterParameters[filter]
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
