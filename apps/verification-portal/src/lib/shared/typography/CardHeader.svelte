<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import LinkIcon from '$lib/components/icons/LinkIcon.svelte';
  export let className: string = '';
  export let title: string = '';
  export let url: string | URL = '';
  export let externalLink: boolean = true;
  const dispatch = createEventDispatcher();
  $: urlAttributes =
    url && externalLink
      ? { target: '_blank' }
      : { 'data-sveltekit-preload-data': 'hover' };
</script>

<slot />

{#if url}
  <a
    href={url.toString()}
    {...urlAttributes}
    {title}
    on:click={() => dispatch('click')}
    ><h3
      class={`${className} transition-color text-primary-400 hover:text-primary-300 dark:text-primary-300 dark:hover:text-primary-200 mb-3 flex flex-row items-baseline gap-2 text-[26px] underline md:text-3xl leading-tight`}
    >
      {title}
      <LinkIcon className="w-5 h-5" />
    </h3>
  </a>
{:else}
  <h3 class={`${className} mb-3 text-[26px] md:text-3xl leading-tight`}>
    {title}
  </h3>
{/if}
