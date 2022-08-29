<template>
  <div>
    <div
      tabindex="1"
      class="collapse collapse-arrow text-white bg-neutral lg:hidden"
    >
      <input type="checkbox" class="peer" />
      <div class="collapse-title text-xl w-full">Filters</div>
      <div class="collapse-content pr-24 border-t-2">
        <form class="mt-6">
          <div
            class="relative border-2 p-2 border-white bg-neutral rounded-full w-full"
          >
            <div
              class="flex absolute inset-y-0 left-0 items-center p-2 pointer-events-none bg-inherit rounded-full"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-white"
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
              class="block h-full pl-12 w-full focus:outline-none text-sm bg-inherit rounded-full text-white placeholder-white"
              placeholder="Search Name or Id..."
              required
            />
          </div>
          <div class="flex flex-col gap-4 md:flex-row mt-6">
            <select
              class="select border-2 border-accent bg-neutral text-white rounded-full"
            >
              <option disabled selected class="text-white">
                Conservation status
              </option>
              <option>Preserved specimen</option>
              <option>Human observation</option>
              <option>Machine observation</option>
            </select>
            <select
              class="select border-2 bg-neutral border-accent text-white rounded-full"
            >
              <option disabled selected class="text-white">Location</option>
              <option>Kenya</option>
              <option>Netherlands</option>
            </select>
            <div
              class="relative border-2 border-accent p-2 bg-neutral rounded-full"
            >
              <div
                class="flex absolute inset-y-0 left-0 items-center p-2 pointer-events-none bg-inherit rounded-full"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-white"
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
                class="block h-full pl-12 w-full focus:outline-none text-sm bg-inherit rounded-full text-white placeholder-white"
                placeholder="Created at"
              />
            </div>
            <div
              class="border-2 border-accent relative p-2 bg-neutral rounded-full"
            >
              <div
                class="flex absolute inset-y-0 left-0 items-center p-2 pointer-events-none bg-inherit rounded-full"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-white"
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
                class="block h-full pl-12 w-full focus:outline-none text-sm bg-inherit rounded-full text-white placeholder-white"
                placeholder="Updated at"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- Mobile -->
    <form class="hidden lg:flex w-full py-12">
      <div
        class="w-1/2 relative border-2 border-white bg-neutral rounded-full mr-5"
      >
        <div
          class="flex absolute inset-y-0 left-0 items-center p-3 pointer-events-none bg-inherit rounded-full"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-white"
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
          class="block h-full pl-12 w-full focus:outline-none text-sm bg-inherit rounded-full text-white placeholder-white"
          placeholder="Search Name or Id..."
          required
        />
      </div>
      <div class="flex w-full justify-end">
        <select class="select max-w-xs bg-neutral text-white rounded-full">
          <option disabled selected class="text-white">
            Conservation status
          </option>
          <option>Preserved specimen</option>
          <option>Human observation</option>
          <option>Machine observation</option>
        </select>
        <select class="select max-w-xs bg-neutral text-white rounded-full">
          <option disabled selected class="text-white">Location</option>
          <option>Kenya</option>
          <option>Netherlands</option>
        </select>
        <div class="w-1/2 relative bg-neutral rounded-full">
          <div
            class="flex absolute inset-y-0 left-0 items-center p-3 pointer-events-none bg-inherit rounded-full"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-white"
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
            class="block h-full pl-12 w-full focus:outline-none text-sm bg-inherit rounded-full text-white placeholder-white"
            placeholder="Created at"
          />
        </div>
        <div class="w-1/2 relative bg-neutral rounded-full">
          <div
            class="flex absolute inset-y-0 left-0 items-center p-3 pointer-events-none bg-inherit rounded-full"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-white"
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
            class="block h-full pl-12 w-full focus:outline-none text-sm bg-inherit rounded-full text-white placeholder-white"
            placeholder="Updated at"
          />
        </div>
      </div>
    </form>
  </div>
</template>
