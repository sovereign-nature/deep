<script setup lang="ts">
import _ from 'lodash';
import { initPopovers } from 'flowbite';
import { prepareURL } from '~~/utils';

defineProps<{ attributes: [any] }>();
onMounted(() => {
  initPopovers();
});
</script>

<template>
  <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
    Attributes:
  </h2>
  <div
    class="w-full rounded-sm border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-black">
    <div
      class="scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-transparent flow-root max-h-72 overflow-auto">
      <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        <li
          v-for="attr in attributes || []"
          :key="attr.trait_type"
          class="py-3 sm:py-4">
          <div class="flex flex-row px-4">
            <div class="basis-1/2">
              <p
                class="truncate text-sm font-medium text-gray-900 dark:text-white">
                {{ _.startCase(attr.trait_type) }}
              </p>
            </div>
            <div
              class="basis-1/2 text-right text-base font-semibold text-gray-900 dark:text-white">
              <a
                v-if="
                  typeof attr.value === 'string' && attr.value.includes('ipfs')
                "
                :href="prepareURL(attr.value)"
                target="_blank"
                :data-popover-target="'popover-' + attr.trait_type">
                {{ _.truncate(attr.value) }}
                <div
                  :id="'popover-' + attr.trait_type"
                  data-popover
                  role="tooltip"
                  class="invisible absolute z-10 inline-block w-64 rounded-sm border border-gray-200 bg-white text-sm font-light text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-black dark:text-gray-400">
                  <div
                    class="rounded-t-lg border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-black">
                    <h3 class="font-semibold text-gray-900 dark:text-white">
                      {{ _.startCase(attr.trait_type) }}
                    </h3>
                  </div>
                  <div class="px-3 py-2">
                    <img :src="prepareURL(attr.value)" />
                  </div>
                  <div data-popper-arrow></div>
                </div>
              </a>
              <p v-else>
                {{ _.truncate(attr.value) }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
