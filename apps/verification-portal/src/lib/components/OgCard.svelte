<script lang="ts">
  import Logo from '$lib/components/icons/Logo.svelte';
  export let title = '';
  export let tokenId = '';
  export let funds = '';
  export let source = '';
  export const img = '/placeholder';
</script>

<div
  class="bg-[#001512] flex w-full h-full items-center justify-between"
  style="background-image: linear-gradient(109.99deg, #001512 13.97%, #000C15 68.63%);
"
>
  <Logo
    className="absolute top-65px left-48px width-[96px] height-[96px] text-white"
  />
  <div class="flex flex-col w-1/3 px-12">
    <h1 class="text-70px font-serif text-white capitalize">
      {title}
    </h1>
    {#if source}
      <div class="flex items-start text-white">
        <span class="text-primary">Source:</span>
        <span class="text-[#00C67E] ml-2">{source}</span>
      </div>
    {/if}
    {#if tokenId}
      <div class="flex items-start text-white">
        <span class="text-primary">TokenID:</span>
        <span class="text-[#00C67E] ml-2">{tokenId}</span>
      </div>
    {/if}
    {#if funds}
      <div class="flex items-start text-white">
        <span class="text-primary">Funds raised so far:</span>
        <span class="text-[#00C67E] ml-2">{funds}</span>
      </div>
    {/if}
  </div>
  <div
    class="bg-purple-200 absolute block h-899px w-899px rounded-full right-0 -top-132px left-490px"
  >
    Placeholder
    <!-- @TODO debug why empty div crashes the generator -->
  </div>
</div>
