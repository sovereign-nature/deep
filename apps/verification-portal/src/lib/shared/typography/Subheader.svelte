<script lang="ts">
  import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
  import Info from '$lib/shared/typography/Info.svelte';
  import { addToToc } from '$lib/features/toc';

  import { onMount } from 'svelte';
  export let className: string = '';
  export let info: string = '';
  export let url: string = '';
  export let id: string | undefined;
  export let title: string | undefined;

  onMount(() => {
    if (id && title) {
      const contentTitle = title !== undefined ? title : id;
      addToToc(contentTitle, id);
    }
  });
</script>

<h2
  {id}
  class={`${className} mb-4 flex items-center font-sans text-sm font-light mt-8 sm:mt-auto`}
>
  <slot />

  {#if url}
    <a
      class="opacity-80 hover:opacity-100"
      href={url}
      target="_blank"
      title={info}
    >
      <InfoIcon className="w-3 h-3 ms-2 " />
    </a>
  {:else if info}
    <Info className="ms-2">
      {info}
    </Info>
  {/if}
</h2>
