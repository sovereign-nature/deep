<template>
  <div>
    <div
      tabindex="1"
      class="collapse collapse-arrow bg-neutral text-white lg:hidden"
    >
      <input type="checkbox" class="peer" />
      <div class="collapse-title w-full text-xl">Filters</div>
      <div class="collapse-content border-t-2 pr-24">
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
            <div
              class="relative rounded-full border-2 border-accent bg-neutral p-2"
            >
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-full bg-inherit p-2"
              >
                <svg
                  aria-hidden="true"
                  class="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                datepicker
                type="text"
                class="block h-full w-full rounded-full bg-inherit pl-12 text-sm text-white placeholder:text-white focus:outline-none"
                placeholder="Created at"
              />
            </div>
            <div
              class="relative rounded-full border-2 border-accent bg-neutral p-2"
            >
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-full bg-inherit p-2"
              >
                <svg
                  aria-hidden="true"
                  class="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                datepicker
                type="text"
                class="block h-full w-full rounded-full bg-inherit pl-12 text-sm text-white placeholder:text-white focus:outline-none"
                placeholder="Updated at"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- Mobile -->
    <form class="hidden w-full py-12 lg:flex">
      <div
        class="relative mr-5 w-1/2 rounded-full border-2 border-white bg-neutral"
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
          type="search"
          class="block h-full w-full rounded-full bg-inherit pl-12 text-sm text-white placeholder:text-white focus:outline-none"
          placeholder="Search Name or Id..."
          required
        />
      </div>
      <div class="flex gap-2 w-full justify-end">
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
        <div class="relative w-1/2 rounded-full bg-neutral">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-full bg-inherit p-3"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            datepicker
            type="text"
            class="block h-full w-full rounded-full bg-inherit pl-12 text-sm text-white placeholder:text-white focus:outline-none"
            placeholder="Created at"
          />
        </div>
        <div class="relative w-1/2 rounded-full bg-neutral">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-full bg-inherit p-3"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            datepicker
            type="text"
            class="block h-full w-full rounded-full bg-inherit pl-12 text-sm text-white placeholder:text-white focus:outline-none"
            placeholder="Updated at"
          />
        </div>
      </div>
    </form>
  </div>
</template>
