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
      class="transition-color text-primary-400 hover:text-primary-300 dark:text-primary-300 dark:hover:text-primary-200 mb-3 flex flex-row items-baseline gap-2 text-[26px] underline md:text-3xl leading-tight"
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
