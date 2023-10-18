<script lang="ts">
  import { generateIPFSImageUrl, isIPFSUrl, isLongTitle } from '$lib/utils';
  import Logo from '$lib/components/icons/Logo.svelte';
  import FundsWidget from '$lib/components/dashboard/FundsWidget.svelte';
  export let title = '';
  export let tokenId = '';
  export let funds = '';
  export let source = '';
  export let img =
    'https://imagedelivery.net/TbEOGfUBcfmfflqdtuuZVA/b72060a5-e585-48bc-97b1-f73358d7ec00/public';
  const mediumTitle = isLongTitle(title);
  const smallTitle = isLongTitle(title, 9, 3);

  let fontSizeClass = 'text-72px'; // Default font size

  if (smallTitle) {
    fontSizeClass = 'text-50px'; // Small font size
  } else if (mediumTitle) {
    fontSizeClass = 'text-62px'; // Medium font size
  }
  $: imageUrl = isIPFSUrl(img) ? generateIPFSImageUrl(img) : img;
</script>

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
      class="font-serif text-white capitalize leading-snug max-h-198px max-w-352px overflow-hidden break-all {fontSizeClass}"
    >
      {title}
    </h1>
    {#if source}
      <div
        class="flex items-start text-white text-21px mb-2"
        style="font-family: Roboto; font-weight:400"
      >
        <strong>Source:</strong>
        <span class="text-[#00C67E] ml-2">{source}</span>
      </div>
    {/if}
    {#if tokenId}
      <div
        class="flex items-start text-white text-21px"
        style="font-family: Roboto; font-weight:400;"
      >
        <strong>Token ID:</strong>
        <span class="text-[#00C67E] ml-2">{tokenId}</span>
      </div>
    {/if}
  </div>
  {#if funds}
    <span
      class="absolute left-58px top-510px text-[#00C67E] text-21px"
      style="font-family: Roboto; font-weight:400"
      >Total funds generated to date:</span
    >
    <FundsWidget
      size="xl"
      {funds}
      className="bg-[#002727] text-[#08FFA6] left-375px top-353px absolute"
    ></FundsWidget>
  {/if}
</div>
