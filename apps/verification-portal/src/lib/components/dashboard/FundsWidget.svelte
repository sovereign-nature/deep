<script lang="ts">
  import { shortenMoneyValue } from '$lib/utils';

  export let funds: string;
  export let className: string;
  export let size: 'sm' | 'lg' | 'xl' = 'sm';

  let baseClass = 'funds-widget';
  let widgetClass: string;

  $: {
    const sizeClasses = {
      sm: 'h-28 w-28 text-4xl',
      lg: 'h-36 w-36 text-4xl',
      xl: 'h-231px w-231px text-66px',
    };
    widgetClass = `${baseClass} ${className} ${sizeClasses[size]}`;
  }
</script>

<span class={widgetClass}>
  {shortenMoneyValue(funds)}$
</span>

<style lang="postcss">
  .funds-widget {
    @apply rounded-full mb-2 font-serif flex justify-center items-center;
  }
</style>
