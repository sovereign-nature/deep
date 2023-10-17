<script lang="ts">
  import FundsWidget from '$lib/components/dashboard/FundsWidget.svelte';
  export let assetFunds: string = '';
  export let totalFunds: string;
</script>

<div
  class="flex flex-wrap md:flex-nowrap gap-8 lg:flex-col xl:flex-row items-end md:items-center xl:items-end justify-center"
>
  {#if assetFunds}
    <div class="funds-widget-container">
      <FundsWidget
        funds={assetFunds}
        className="bg-primary-200 dark:bg-white text-deep-blue-800"
      ></FundsWidget>
      <span
        class="text-sm text-black dark:text-white xl:text-white xl:dark:text-black"
        >By this asset</span
      >
    </div>
  {/if}

  {#if totalFunds}
    <div class="funds-widget-container">
      <FundsWidget
        size="lg"
        funds={totalFunds}
        className="bg-deep-green dark:text-primary-300"
      ></FundsWidget>
      <span
        class="text-sm text-black dark:text-primary-300 xl:text-white xl:dark:text-black"
        >Total</span
      >
    </div>
  {/if}
</div>

<style lang="postcss">
  .funds-widget-container {
    @apply text-center;
  }
  .funds-widget {
    @apply rounded-full mb-2 font-serif flex justify-center items-center;
  }
</style>
