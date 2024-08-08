<script lang="ts">
  import HexagonGridIcon from '$lib/components/icons/HexagonGridIcon.svelte';
  import Subheader from '$lib/shared/typography/Subheader.svelte';
  import HexagonEggIcon from '$lib/components/icons/HexagonEggIcon.svelte';
  import SocialQuestForm from '../SocialquestForm/SocialQuestForm.svelte';
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
      <div class="my-4">
        <SocialQuestForm />
      </div>
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
