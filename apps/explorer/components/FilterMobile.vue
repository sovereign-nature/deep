<template>
  <div>
    <input type="checkbox" class="peer" />
    <div class="collapse-title w-full text-xl">Filters</div>
    <div class="collapse-content border-t-2">
      <form class="mt-6">
        <div
          class="relative w-full rounded-full border-2 border-white bg-neutral p-3">
          <input
            id="default-search"
            type="search"
            class="block h-full w-full rounded-full bg-inherit pl-4 text-sm text-white placeholder:text-white focus:outline-none"
            placeholder="Search by Id, Owner or Name..."
            required
            @input="searchByParameter($event, 'idNameOwner')" />
        </div>
        <div class="mt-6 flex flex-col gap-4 md:flex-row">
          <select
            class="select rounded-full border-2 border-accent bg-neutral text-white"
            @input="searchByParameter($event, 'status')">
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
            @input="searchByParameter($event, 'createdDate')" />
          <Datepicker
            v-model="updatedDate"
            dark
            placeholder="Updated at"
            class="rounded-full border-2 border-accent bg-neutral text-white"
            @input="searchByParameter($event, 'updatedDate')" />
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker';

const createdDate = ref([]);
const updatedDate = ref([]);

defineProps({
  searchByParameter: {
    type: Function,
    required: false,
    default: () => [{}],
  },
});
</script>
<style lang="scss"></style>
