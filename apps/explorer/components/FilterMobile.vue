<template>
  <div
    tabindex="1"
    class="collapse collapse-arrow bg-neutral text-white lg:hidden"
  >
    <input type="checkbox" class="peer" />
    <div class="collapse-title w-full text-xl">Filters</div>
    <div class="collapse-content border-t-2">
      <form class="mt-6">
        <div
          class="relative w-full rounded-full border-2 border-white bg-neutral p-2"
        >
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-full bg-inherit p-2"
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
            type="search"
            class="block h-full w-full rounded-full bg-inherit pl-12 text-sm text-white placeholder:text-white focus:outline-none"
            placeholder="Search Name or Id..."
            required
          />
        </div>
        <div class="mt-6 flex flex-col gap-4 md:flex-row">
          <select
            class="select rounded-full border-2 border-accent bg-neutral text-white"
          >
            <option disabled selected class="text-white">
              Conservation status
            </option>
            <option>Preserved specimen</option>
            <option>Human observation</option>
            <option>Machine observation</option>
          </select>
          <select
            class="select rounded-full border-2 border-accent bg-neutral text-white"
          >
            <option disabled selected class="text-white">Location</option>
            <option>Kenya</option>
            <option>Netherlands</option>
          </select>
          <Datepicker
            v-model="createdDate"
            dark
            placeholder="Created at"
            class="rounded-full border-2 border-accent bg-neutral text-white"
          />
          <Datepicker
            v-model="updatedDate"
            dark
            placeholder="Updated at"
            class="rounded-full border-2 border-accent bg-neutral text-white"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'

const createdDate = ref([])
const updatedDate = ref([])
</script>
<style lang="scss"></style>
