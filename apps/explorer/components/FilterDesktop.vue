<template>
  <form>
    <div
      class="relative mr-5 w-full rounded-full border-2 border-white bg-neutral"
    >
      <input
        id="default-search"
        type="text"
        class="block h-full w-full rounded-full bg-inherit pl-4 text-sm text-white placeholder:text-white focus:outline-none"
        placeholder="Search by Id, Owner or Name..."
        required
        @input="searchResultByIdOrOwnerOrName"
      />
    </div>
    <div class="flex w-full justify-end gap-2">
      <select
        class="select max-w-xs rounded-full bg-neutral text-white"
        @input="searchResultByStatus"
      >
        <option disabled selected class="text-white">
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
        class="relative inset-y-0 left-0 flex items-center"
        @input="searchResultByCreatedDate"
      />
      <Datepicker
        v-model="updatedDate"
        dark
        placeholder="Updated at"
        class="relative inset-y-0 left-0 flex items-center"
        @input="searchResultByUpdatedDate"
      />
    </div>
  </form>
</template>
<script setup lang="ts">
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

function filterResults() {
  filteredResults = souls

  router.push({
    query: {
      idNameOwner: filterParameters.idNameOwner,
      status: filterParameters.status,
      createdDate: filterParameters.createdDate,
      updatedDate: filterParameters.updatedDate
    }
  })

  if (filterParameters.idNameOwner) {
    filteredResults = filteredResults.filter(
      (soul) =>
        soul.id.toLocaleLowerCase().includes(filterParameters.idNameOwner) ||
        soul.name.toLocaleLowerCase().includes(filterParameters.idNameOwner) ||
        soul.owner.toLocaleLowerCase().includes(filterParameters.idNameOwner)
    )
  }

  if (filterParameters.status) {
    filteredResults = filteredResults.filter(
      (soul) => soul.status === +filterParameters.status
    )
  }

  if (filterParameters.createdDate) {
    filteredResults = filteredResults.filter((soul) =>
      soul.createdTimestamp.toString().includes(filterParameters.createdDate)
    )
  }

  if (filterParameters.updatedDate) {
    filteredResults = filteredResults.filter((soul) =>
      soul.updatedTimestamp.toString().includes(filterParameters.updatedDate)
    )
  }

  emit('searchFilter', filteredResults as Soul[])
}

function searchResultByIdOrOwnerOrName(event): void {
  const searchTerm = event.target.value
  filterParameters.idNameOwner = searchTerm

  filterResults()
}

function searchResultByStatus(event): void {
  const searchTerm = event.target.value
  filterParameters.status = searchTerm

  filterResults()
}

function searchResultByCreatedDate(event): void {
  const searchTerm = event.target.value
  filterParameters.createdDate = searchTerm

  filterResults()
}

function searchResultByUpdatedDate(event): void {
  const searchTerm = event.target.value
  filterParameters.updatedDate = searchTerm

  filterResults()
}
</script>
<style lang="scss"></style>
