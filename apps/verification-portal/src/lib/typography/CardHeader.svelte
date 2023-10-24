<script lang="ts">
  import LinkIcon from '$lib/components/icons/LinkIcon.svelte';
  export let className: string = '';
  export let title: string = '';
  export let url: string = '';
</script>

<slot />

{#if url}
  <a class={className} href={url} target="_blank" {title}
    ><h3
      class="transition-color text-2xl md:text-3xl mb-3 underline text-primary-400 hover:text-primary-300 dark:text-primary-300 dark:hover:text-primary-200 flex flex-row gap-2 items-baseline"
    >
      {title}
      <LinkIcon className="w-5 h-5" />
    </h3>
  </a>
{:else}
  <h3 class={`${className} text-2xl md:text-3xl mb-3`}>
    {title}
  </h3>
{/if}
