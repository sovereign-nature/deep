<script lang="ts">
  import { writable } from 'svelte/store';
  import { createEventDispatcher, onDestroy } from 'svelte';
  import {
    setEmblaContex,
    type CarouselProps,
    type CarouselAPI,
    type CarouselOptions,
  } from './context.js';
  import { cn } from '$lib/utils.js';
  const dispatch = createEventDispatcher();

  type $$Props = CarouselProps;

  export let opts: CarouselOptions = {};
  export let plugins: NonNullable<$$Props['plugins']> = [];
  export let api: $$Props['api'] = undefined;
  export let orientation: NonNullable<$$Props['orientation']> = 'horizontal';

  let className: $$Props['class'] = undefined;
  export { className as class };

  const startIndex = opts.startIndex ? opts.startIndex : 0;
  export let activeItemIndex: number = startIndex;

  const apiStore = writable<CarouselAPI | undefined>(undefined);
  const orientationStore = writable(orientation);
  const canScrollPrev = writable(false);
  const canScrollNext = writable(false);
  const optionsStore = writable(opts);
  const pluginStore = writable(plugins);
  const activeItem = writable(startIndex);

  $: orientationStore.set(orientation);
  $: pluginStore.set(plugins);
  $: optionsStore.set(opts);
  $: scrollTo(activeItemIndex);
  $: activeItemIndex = $activeItem;
  function scrollPrev() {
    if ($activeItem > 0) {
      $activeItem--;
      scrollTo($activeItem);
    } else if (api?.canScrollPrev()) {
      api?.scrollPrev();
      $activeItem = (api?.containerNode()?.childElementCount ?? 0) - 1;
    }
  }
  function scrollNext() {
    if ($activeItem < (api?.containerNode()?.childElementCount ?? 0) - 1) {
      $activeItem++;
      scrollTo($activeItem);
    } else if (api?.canScrollNext()) {
      api?.scrollNext();
      $activeItem = 0;
    }
  }
  function scrollTo(index: number) {
    api?.scrollTo(index);
    activeItem.set(index);
  }

  function onSelect(api: CarouselAPI) {
    if (!api) return;
    canScrollPrev.set(api.canScrollPrev());
    canScrollNext.set(api.canScrollNext());
  }
  function onResize(api: CarouselAPI) {
    if (!api) return;
    api.scrollTo($activeItem);
    canScrollPrev.set(api.canScrollPrev());
    canScrollNext.set(api.canScrollNext());
  }

  $: if (api) {
    onSelect(api);
    onResize(api);
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    api.on('resize', onResize);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollNext();
    }
  }

  setEmblaContex({
    api: apiStore,
    scrollPrev,
    scrollNext,
    scrollTo,
    activeItem,
    orientation: orientationStore,
    canScrollNext,
    canScrollPrev,
    handleKeyDown,
    options: optionsStore,
    plugins: pluginStore,
    onInit,
  });

  function onInit(event: CustomEvent<CarouselAPI>) {
    api = event.detail;
    dispatch('init', true);
    apiStore.set(api);
  }

  onDestroy(() => {
    api?.off('select', onSelect);
    api?.off('resize', onResize);
    api?.off('reInit', onSelect);
  });
</script>

<div
  class={cn(
    'relative carousel-wrapper',
    className,
    $canScrollNext && 'carousel-fade-end',
    $canScrollPrev && 'carousel-fade-start'
  )}
  on:mouseenter
  on:mouseleave
  role="region"
  aria-roledescription="carousel"
  {...$$restProps}
>
  <slot />
</div>
