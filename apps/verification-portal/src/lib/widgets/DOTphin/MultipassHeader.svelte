<script lang="ts">
  import HexagonGridIcon from '$lib/components/icons/HexagonGridIcon.svelte';
  import Subheader from '$lib/shared/typography/Subheader.svelte';
  import HexagonEggIcon from '$lib/components/icons/HexagonEggIcon.svelte';
  export let name: string;
  const description =
    'A multi-month, multi-event and multi-chain initiative that evolves with your engagement.';
</script>

<div
  class=" dark:bg-deep-green bg-gray-100 rounded-t-lg xl:rounded-t-lg text-deep-green dark:text-gray-200 overflow-hidden"
>
  <div class=" grid lg:grid-cols-4 grid-flow-row lg:grid-flow-col">
    <div class="col-span-2 px-12 py-4 sm:py-12">
      <Subheader
        id="multipass"
        title={'Multipass collection'}
        className="md:!text-base font-normal text-black dark:text-gray-300"
        >Featured collection</Subheader
      >
      <h3 class="text-6xl">{name}</h3>
      <p>{description}</p>
    </div>
    <div
      class="bg-multipass sm:text-white pb-4 sm:px-8 md:px-11 sm:py-8 xl:pt-11 col-span-2 flex flex-row justify-start sm:items-center gap-5"
    >
      <div
        class=" sm:bg-deep-green sm:bg-opacity-35 rounded-lg p-4 flex flex-col items-center text-center w-full"
      >
        <HexagonGridIcon
          className=" fill-primary-500 text-deep-green-500 h-12 w-12 sm:h-[100px] sm:w-[100px]"
        />
        <span class="text-xs sm:text-base pt-2">Proof of Attendance</span>
      </div>
      <div
        class=" sm:bg-deep-green sm:bg-opacity-35 rounded-lg p-4 flex flex-col items-center text-center w-full"
      >
        <HexagonEggIcon
          className=" fill-primary-500 text-deep-green-500 h-12 w-12 sm:h-[100px] sm:w-[100px]"
        />
        <span class="text-xs sm:text-base pt-2">Evolving NFT</span>
      </div>
    </div>
  </div>
</div>

<style>
  @media (min-width: 640px) {
    .bg-multipass {
      background-image: url('https://imagedelivery.net/TbEOGfUBcfmfflqdtuuZVA/5c63ac43-4c0d-4495-f767-815bd3284a00/public');
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
</style>
