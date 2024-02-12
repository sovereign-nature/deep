<script lang="ts">
  import CardBase from './CardBase.svelte';
  import Logo from '$lib/components/icons/Logo.svelte';
  import FundsWidget from '$lib/components/dashboard/FundsWidget.svelte';
  export let title = '';
  export let tokenId = '';
  export let funds = '';
  export let source = '';
  export let img = '';
</script>

<CardBase
  {title}
  {img}
  let:imageUrl
  let:fontSizeClass
  let:sourceText
  let:tokenText
  let:fundsText
>
  <div
    class="bg-[#001512] flex w-full h-full items-center justify-between"
    style="background-image: linear-gradient(109.99deg, #001512 13.97%, #000C15 68.63%);
"
  >
    <img
      class="absolute h-899px w-899px rounded-full right-0 -top-132px left-490px"
      src={`${imageUrl}`}
      style="object-fit: cover;"
      alt="asset img"
    />
    <Logo className="absolute top-65px left-58px w-96px h-96px text-white" />
    <div class="flex flex-col absolute w-1/3 left-58px top-208px">
      <h1
        class="font-serif text-white capitalize leading-snug max-h-199px max-w-352px overflow-hidden break-all {fontSizeClass}"
      >
        {title}
      </h1>
      {#if source}
        <div
          class="flex items-start text-white text-21px mb-2"
          style="font-family: Roboto; font-weight:400"
        >
          <strong>{sourceText}</strong>
          <span class="text-[#00C67E] ml-2">{source}</span>
        </div>
      {/if}
      {#if tokenId}
        <div
          class="flex items-start text-white text-21px"
          style="font-family: Roboto; font-weight:400;"
        >
          <strong>{tokenText}</strong>
          <span class="text-[#00C67E] ml-2">{tokenId}</span>
        </div>
      {/if}
    </div>
    {#if funds}
      <span
        class="absolute left-58px top-510px text-[#00C67E] text-21px"
        style="font-family: Roboto; font-weight:400">{fundsText}</span
      >
      <FundsWidget
        size="xl"
        {funds}
        className="bg-[#002727] text-[#08FFA6] left-375px top-353px absolute"
      ></FundsWidget>
    {/if}
  </div>
</CardBase>
