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
            @input="searchResultByIdOrOwnerOrName"
          />
        </div>
        <div class="mt-6 flex flex-col gap-4 md:flex-row">
          <select
            class="select rounded-full border-2 border-accent bg-neutral text-white"
            @input="searchResultByStatus"
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
            @input="searchResultByCreatedDate"
          />
          <Datepicker
            v-model="updatedDate"
            dark
            placeholder="Updated at"
            class="rounded-full border-2 border-accent bg-neutral text-white"
            @input="searchResultByUpdatedDate"
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
const filterParams = $ref({} as FilterParameters)

function filterResults() {
  filteredResults = souls

  router.push({
    query: {
      idNameOwner: filterParams.idNameOwner,
      status: filterParams.status,
      createdDate: filterParams.createdDate,
      updatedDate: filterParams.updatedDate
    }
  })

  if (filterParams.idNameOwner) {
    filteredResults = filteredResults.filter(
      (soul) =>
        soul.id.toLocaleLowerCase().includes(filterParams.idNameOwner) ||
        soul.name.toLocaleLowerCase().includes(filterParams.idNameOwner) ||
        soul.owner.toLocaleLowerCase().includes(filterParams.idNameOwner)
    )
  }

  if (filterParams.status) {
    filteredResults = filteredResults.filter(
      (soul) => soul.status === +filterParams.status
    )
  }

  if (filterParams.createdDate) {
    filteredResults = filteredResults.filter((soul) =>
      soul.createdTimestamp.toString().includes(filterParams.createdDate)
    )
  }

  if (filterParams.updatedDate) {
    filteredResults = filteredResults.filter((soul) =>
      soul.updatedTimestamp.toString().includes(filterParams.updatedDate)
    )
  }

  emit('searchFilter', filteredResults as Soul[])
}

function searchResultByIdOrOwnerOrName(event): void {
  const searchTerm = event.target.value
  filterParams.idNameOwner = searchTerm

  filterResults()
}

function searchResultByStatus(event): void {
  const searchTerm = event.target.value
  filterParams.status = searchTerm

  filterResults()
}

function searchResultByCreatedDate(event): void {
  const searchTerm = event.target.value
  filterParams.createdDate = searchTerm

  filterResults()
}

function searchResultByUpdatedDate(event): void {
  const searchTerm = event.target.value
  filterParams.updatedDate = searchTerm

  filterResults()
}
</script>
<style lang="scss"></style>
