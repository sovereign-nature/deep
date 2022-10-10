<template>
  <form>
    <div
      class="relative mr-5 w-1/3 rounded-full border-2 border-white bg-neutral"
    >
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-full bg-inherit p-3"
      >
        <svg
          aria-hidden="true"
          class="h-5 w-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        id="default-search"
        type="text"
        class="block h-full w-full rounded-full bg-inherit pl-12 text-sm text-white placeholder:text-white focus:outline-none"
        placeholder="Search Name or Id..."
        required
        :value="searchTerm"
        @keyup="searchResult"
      />
    </div>
    <div class="flex w-full justify-end gap-2">
      <select class="select max-w-xs rounded-full bg-neutral text-white">
        <option disabled selected class="text-white">
          Conservation status
        </option>
        <option>Preserved specimen</option>
        <option>Human observation</option>
        <option>Machine observation</option>
      </select>
      <select class="select max-w-xs rounded-full bg-neutral text-white">
        <option disabled selected class="text-white">Location</option>
        <option>Kenya</option>
        <option>Netherlands</option>
      </select>
      <Datepicker
        v-model="createdDate"
        dark
        placeholder="Created at"
        class="relative inset-y-0 left-0 flex items-center"
      />
      <Datepicker
        v-model="updatedDate"
        dark
        placeholder="Updated at"
        class="relative inset-y-0 left-0 flex items-center"
      />
    </div>
  </form>
</template>
<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'

const souls = useSouls()
let searchTerm = $ref('')
let filteredResults = $ref([])
const createdDate = ref([])
const updatedDate = ref([])

function searchResult(event): void {
  searchTerm = event.target.value
  filteredResults = souls.value.filter((soul) =>
    soul.id.toLocaleLowerCase().includes(searchTerm)
  )
  useSouls(filteredResults)
}
</script>
<style lang="scss"></style>
