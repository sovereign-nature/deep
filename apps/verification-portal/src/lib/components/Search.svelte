<script>
  import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance>
  <label
    for="default-search"
    class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >Search</label
  >
  <div class="relative">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <svg
        class="h-4 w-4 text-gray-200"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
    <input
      id="default-search"
      name="search"
      type="search"
      class="block border-white w-full border p-4 pl-10 text-sm text-gray-200 focus:border-white focus:ring-white dark:placeholder:text-gray-400 bg-black"
      placeholder="Search by Asset Name, Address or ID"
      required
    />
    <button
      type="submit"
      class="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Search
    </button>
  </div>
</form>
