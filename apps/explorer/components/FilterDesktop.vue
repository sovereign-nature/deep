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
        @input="searchByParameter($event, 'idNameOwner')"
      />
    </div>
    <div class="flex w-full justify-end gap-2">
      <select
        class="select max-w-xs rounded-full bg-neutral text-white"
        @input="searchByParameter($event, 'status')"
      >
        <option disabled selected class="text-white">
          Conservation status
        </option>
        <option value="5">Preserved specimen</option>
        <option value="-61">Human observation</option>
        <option value="88">Machine observation</option>
      </select>
      <Datepicker
        v-model="createdDate"
        dark
        placeholder="Created at"
        class="relative inset-y-0 left-0 flex items-center"
        @input="searchByParameter($event, 'createdDate')"
      />
      <Datepicker
        v-model="updatedDate"
        dark
        placeholder="Updated at"
        class="relative inset-y-0 left-0 flex items-center"
        @input="searchByParameter($event, 'updatedDate')"
      />
    </div>
  </form>
</template>
<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'

const createdDate = ref([])
const updatedDate = ref([])

defineProps({
  searchByParameter: {
    type: Function,
    required: false,
    default: () => [{}]
  }
})
</script>
<style lang="scss"></style>
