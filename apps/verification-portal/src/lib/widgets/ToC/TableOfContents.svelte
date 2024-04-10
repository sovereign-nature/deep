<script lang="ts">
  import { toc, tocTitle } from '$lib/features/toc';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<nav class="mb-4 w-full">
  <ul class="divide-y divide-primary-300 ms-4 list-inside list-disc">
    {#if $tocTitle}
      <h3 class="font-serif text-primary-200 py-3 text-base">
        {$tocTitle}
      </h3>
    {/if}
    {#each $toc as entry, index (entry.id + index)}
      <li class="py-3 font-aeonik text-gray-50 text-lg">
        <a href={'#' + entry.id} on:click={() => dispatch('linkClicked')}
          >{entry.title}</a
        >
      </li>
    {/each}
  </ul>
</nav>
