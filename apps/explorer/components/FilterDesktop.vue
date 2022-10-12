<template>
  <form>
    <div
      class="relative mr-5 w-1/3 rounded-full border-2 border-white bg-neutral"
    >
      <input
        id="default-search"
        type="text"
        class="block h-full w-full rounded-full bg-inherit pl-4 text-sm text-white placeholder:text-white focus:outline-none"
        placeholder="Search by Id, Owner or Name..."
        required
        @input="searchResult"
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
import { Soul } from '~~/types/soul'
const emit = defineEmits(['searchFilter'])
const souls = $ref(useSouls())
let searchTerm = $ref('')
let filteredResults = $ref([])
const createdDate = ref([])
const updatedDate = ref([])

function searchResult(event): void {
  searchTerm = event.target.value
  filteredResults = souls.filter(
    (soul) =>
      soul.id.toLocaleLowerCase().includes(searchTerm) ||
      soul.name.toLocaleLowerCase().includes(searchTerm) ||
      soul.owner.toLocaleLowerCase().includes(searchTerm) ||
      soul.createdTimestamp.toString().includes(createdDate.toString()) ||
      soul.updatedTimestamp.toString().includes(updatedDate.toString())
  )
  emit('searchFilter', filteredResults as Soul[])
}
</script>
<style lang="scss"></style>
