<script type="ts">
  import axios from 'axios';
  import Card from '$lib/components/Card.svelte';
  import SearchInput from '$lib/components/search/SearchInput.svelte';

  let searchResults = [];
  let searchQuery = '';
  let searchEmpty = true;

  let debounceTimeout;

  export const handleSearch = async (e) => {
    // Clear the existing debounce timeout
    clearTimeout(debounceTimeout);

    searchQuery = e.detail;

    // Set a new debounce timeout to delay the search by 300 milliseconds
    debounceTimeout = setTimeout(async () => {
      if (searchQuery.length === 0) {
        searchEmpty = true;
        searchResults = [];
        return;
      }

      try {
        const response = await axios.get(
          `/search?collection=hotel_hideaway&q=${searchQuery}`
        );
        searchResults = response.data.data;
        searchEmpty = false;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 300); // 300 milliseconds debounce time
  };
</script>

<div>
  <SearchInput
    on:search={handleSearch}
    on:input={handleSearch}
    placeholder="Type the asset name"
  />

  <slot name="results">
    <div class="flex flex-col gap-2 mt-24">
      {#if searchResults && searchResults.length > 0}
        {#each searchResults as { id, name, image } (id)}
          <Card {id} {name} {image} source="Hotel Hideaway" isList />
        {/each}
      {:else if !searchEmpty}
        <p class="text-xl text-center text-white">No results found.</p>
      {/if}
    </div>
  </slot>
</div>
