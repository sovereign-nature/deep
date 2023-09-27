<script lang="ts">
  export let assetFunds: string = '';
  export let totalFunds: string;
  // Function to shorten money values
  function shortenMoneyValue(value: string): string {
    const num = parseFloat(value);
    if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'k';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'm';
    } else {
      return value;
    }
  }
</script>

<div
  class="flex flex-wrap md:flex-nowrap gap-8 lg:flex-col xl:flex-row items-end md:items-center xl:items-end justify-center"
>
  {#if assetFunds}
    <div class="funds-widget-container">
      <span
        class="funds-widget h-28 w-28 bg-primary-200 dark:bg-white font-serif text-deep-blue-800 text-4xl"
      >
        {shortenMoneyValue(assetFunds)}$
      </span>
      <span
        class="text-sm text-black dark:text-white xl:text-white xl:dark:text-black"
        >By this asset</span
      >
    </div>
  {/if}

  {#if totalFunds}
    <div class="funds-widget-container">
      <span
        class="funds-widget h-36 w-36 bg-deep-green dark:text-primary-300 text-4xl"
      >
        {shortenMoneyValue(totalFunds)}$
      </span>
      <span
        class="text-sm text-black dark:text-primary-300 xl:text-white xl:dark:text-black"
        >Total</span
      >
    </div>
  {/if}
</div>

<style>
  .funds-widget-container {
    @apply text-center;
  }
  .funds-widget {
    @apply rounded-full mb-2 font-serif flex justify-center items-center;
  }
</style>
