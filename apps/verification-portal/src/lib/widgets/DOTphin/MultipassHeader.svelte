<script lang="ts">
  import HexagonGridIcon from '$lib/components/icons/HexagonGridIcon.svelte';
  import Subheader from '$lib/shared/typography/Subheader.svelte';
  import HexagonEggIcon from '$lib/components/icons/HexagonEggIcon.svelte';
  export let name: string;
  const description =
    'A multi-month, multi-event and multi-chain initiative that evolves with your engagement.';
</script>

<div
  class=" dark:bg-deep-green bg-gray-100 sm:rounded-t-lg xl:rounded-t-lg text-deep-green dark:text-gray-200 overflow-hidden"
>
  <div class=" grid lg:grid-cols-4 grid-flow-row lg:grid-flow-col">
    <div class="col-span-2 px-12 py-12">
      <Subheader
        id="multipass"
        title={'Multipass collection'}
        className="md:!text-base font-normal text-black dark:text-gray-300"
        >Featured collection</Subheader
      >
      <h3 class="text-6xl">{name}</h3>
      <p>{description}</p>
      <form class="my-4 mt-8 flex flex-col">
        <h4>Virtual Proof Of Attendance</h4>
        <p class="text-sm font-normal text-gray-500 dark:text-gray-400"></p>
        <label for="email" class="text-xs mt-4">Email:</label>
        <input
          id="email"
          class="rounded h-10 mb-4 mt-1 border border-primary-300"
        />
        <button
          type="button"
          class="px-3 py-2 rounded-full whitespace-nowrap disabled:opacity-80 disabled:cursor-not-allowed drop-shadow-sm text-white bg-primary-400 hover:bg-primary-300 font-aeonik text-base"
          >Get Free Proof</button
        >
      </form>
    </div>
    <div
      class="bg-multipass text-white px-12 sm:px-8 md:px-11 py-8 xl:pt-11 col-span-2 flex flex-col sm:flex-row justify-start sm:items-center gap-5"
    >
      <div
        class=" bg-deep-green bg-opacity-35 rounded-lg p-4 flex flex-col items-center text-center w-full"
      >
        <HexagonGridIcon
          className=" fill-primary-500 text-deep-green-500 h-24 w-24 sm:h-[155px]"
        />
        <span>Proof of Attendance</span>
      </div>
      <div
        class=" bg-deep-green bg-opacity-35 rounded-lg p-4 flex flex-col items-center text-center w-full"
      >
        <HexagonEggIcon
          className=" fill-primary-500 text-deep-green-500 h-24 w-24 sm:h-[155px]"
        />
        <span>Evolving NFT</span>
      </div>
    </div>
  </div>
</div>

<style>
  .bg-multipass {
    background-image: url('https://imagedelivery.net/TbEOGfUBcfmfflqdtuuZVA/5c63ac43-4c0d-4495-f767-815bd3284a00/public');
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
