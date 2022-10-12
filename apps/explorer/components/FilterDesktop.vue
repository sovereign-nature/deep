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

const emit = defineEmits(['searchFilter'])
const souls = $ref(useSouls())
const createdDate = ref([])
const updatedDate = ref([])
let filteredResults = $ref([])

function searchResultByIdOrOwnerOrName(event): void {
  const searchTerm = event.target.value
  filteredResults = souls.filter(
    (soul) =>
      soul.id.toLocaleLowerCase().includes(searchTerm) ||
      soul.name.toLocaleLowerCase().includes(searchTerm) ||
      soul.owner.toLocaleLowerCase().includes(searchTerm)
  )
  emit('searchFilter', filteredResults as Soul[])
}

function searchResultByStatus(event): void {
  const searchTerm = event.target.value
  filteredResults = souls.filter((soul) => soul.status === +searchTerm)
  emit('searchFilter', filteredResults as Soul[])
}

// TODO: Test the date with real date format
function searchResultByCreatedDate(event): void {
  const searchTerm = event.target.value
  filteredResults = souls.filter((soul) =>
    soul.createdTimestamp.toString().includes(searchTerm.toString())
  )
  emit('searchFilter', filteredResults as Soul[])
}
function searchResultByUpdatedDate(event): void {
  const searchTerm = event.target.value
  filteredResults = souls.filter((soul) =>
    soul.updatedTimestamp.toString().includes(searchTerm.toString())
  )
  emit('searchFilter', filteredResults as Soul[])
}
</script>
<style lang="scss"></style>
