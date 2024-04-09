<script lang="ts">
  import { toc, tocTitle } from '$lib/features/toc';
</script>

<nav class="mb-4">
  <ul class="divide-y divide-primary-300 ms-4 list-inside list-disc">
    {#if $tocTitle}
      <h3 class="font-serif text-primary-200 text-2xl py-3">
        {$tocTitle}
      </h3>
    {/if}
    {#each $toc as entry, index (entry.id + index)}
      <li class="py-3 font-aeonik">
        <a href={'#' + entry.id}>{entry.title}</a>
      </li>
    {/each}
  </ul>
</nav>
