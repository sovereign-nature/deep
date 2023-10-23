<script lang="ts">
  import { shortenMoneyValue, isLongTitle } from '$lib/utils';
  export let funds: string;
  export let className: string;
  export let size: 'sm' | 'lg' | 'xl' = 'sm';

  let baseClass = 'funds-widget';
  let widgetClass: string;
  $: fundsShortened = shortenMoneyValue(funds);
  $: resizeFunds = isLongTitle(fundsShortened, 4);

  $: {
    const sizeClasses = {
      sm: 'h-28 w-28 text-4xl',
      lg: 'h-36 w-36 text-4xl',
      xl: `h-231px w-231px ${resizeFunds ? 'text-59px' : 'text-77px'}`,
    };
    widgetClass = `${baseClass} ${sizeClasses[size]} ${className}`;
  }
</script>

<span class={widgetClass}>
  {#if fundsShortened !== '0'}
    {fundsShortened}$
  {:else}
    TBA
  {/if}
</span>

<style lang="postcss">
  .funds-widget {
    @apply rounded-full mb-2 font-serif flex justify-center items-center;
  }
</style>
