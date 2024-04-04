<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { getEmblaContext } from './context.js';
  import { cn } from '$lib/utils.js';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Props = {
    index: number;
  } & HTMLAttributes<HTMLDivElement>;
  let className: string | undefined | null = undefined;
  export { className as class };
  export let index: number;

  const { orientation, activeItem, handleKeyDown } =
    getEmblaContext('<Carousel.Item/>');
  function setActive(index: number) {
    $activeItem = index;
  }
</script>

<div
  on:click={() => setActive(index)}
  on:keydown={handleKeyDown}
  role="button"
  tabindex={0}
  aria-roledescription="slide"
  class={cn(
    'min-w-0 shrink-0 grow-0',
    $orientation === 'horizontal' ? 'last:pr-3' : 'pt-4',
    className
  )}
  data-embla-slide=""
  {...$$restProps}
>
  <slot />
</div>
