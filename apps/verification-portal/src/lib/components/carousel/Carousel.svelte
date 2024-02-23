<script lang="ts">
  import viewport from '$lib/features/useViewportActions';

  import { onDestroy, onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { Carousel } from 'flowbite';
  import VideoPlayer from '$lib/components/media/CloudflareStreamPlayer/VideoPlayer.svelte';
  import type { CarouselEntity } from '$lib/types';
  import { browser } from '$app/environment';
  import LL from '$lib/shared/i18n/i18n-svelte.js';

  import type {
    CarouselItem,
    CarouselOptions,
    CarouselInterface,
  } from 'flowbite';
  import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';

  export let items: CarouselEntity[];
  export let isSliding: boolean = true;
  export let carouselClass: string;

  let carouselElement: HTMLElement | undefined = undefined;
  let carousel: CarouselInterface;
  let index = 0;

  // handle fullscreen. picture-in-picture and mouse over carousel to pause sliding
  const playerIsActive = writable(false);
  setContext('playerIsActive', playerIsActive);
  $: autoplay = isSliding && !$playerIsActive;
  $: toggleIsSliding(autoplay);

  type carouselSlides = {
    el: HTMLElement | undefined;
  };

  let carouselItemsInit: carouselSlides[] = items.map((item, index: number) => {
    return { position: index, el: undefined };
  });

  function changeSlide(index: number) {
    if (carousel) {
      carousel.slideTo(index);
      carousel.pause();
    }
  }
  function toggleIsSliding(autoplay: boolean) {
    if (!carousel) return;
    if (autoplay) {
      carousel.cycle();
    } else {
      carousel.pause();
    }
  }
  // TODO enable extra config to handle multiple carousel instances
  // import type { InstanceOptions } from 'flowbite';
  // instance options object
  // const instanceOptions: InstanceOptions = {
  //   id: 'carousel-example',
  //   override: true,
  // };

  function nextSlide() {
    if (!carousel) return;
    isSliding = false;
    carousel.next();
    carousel.pause();
  }
  function prevSlide() {
    if (!carousel) return;
    isSliding = false;
    carousel.prev();
    carousel.pause();
  }
  onMount(() => {
    const options: CarouselOptions = {
      defaultPosition: 0,
      interval: 6000,
      onChange: (carousel) => {
        index = carousel._activeItem.position;
        isSliding = isSliding;
      },
    };
    if (browser) {
      const carouselItems = mapToCarouselItems(carouselItemsInit);
      carousel = new Carousel(carouselElement, carouselItems, options);
      carousel.cycle();
    }
  });
  onDestroy(() => {
    if (carousel) carousel.destroyAndRemoveInstance();
  });

  function mapToCarouselItems(
    carouselItemsInit: carouselSlides[]
  ): CarouselItem[] {
    return carouselItemsInit
      .filter((item) => item.el !== undefined)
      .map((item, index) => ({
        position: index,
        el: item.el as HTMLElement,
      }));
  }
</script>

<svelte:head>
  {#if items.length > 0}
    {#each items as image}
      <link rel="preload" href={image.src} as="image" />
    {/each}
  {/if}
</svelte:head>

<div
  bind:this={carouselElement}
  use:viewport
  on:enterViewport={() => (isSliding = true)}
  on:exitViewport={() => (isSliding = false)}
  on:mouseenter={() => (isSliding = false)}
  on:mouseleave={() => (isSliding = true)}
  role="slider"
  aria-label="carousel"
  tabindex="0"
  aria-valuenow={index}
  class="relative w-full"
>
  <div
    class={`${carouselClass} relative overflow-hidden md:rounded-lg aspect-video w-full`}
  >
    {#each items as item, i}
      <div bind:this={carouselItemsInit[i].el} id={`slide-${i}`}>
        <div
          class={`${index === i ? 'opacity-100' : 'opacity-0 -z-30'} transition-opacity duration-300`}
        >
          {#if item.video}
            <VideoPlayer
              paused={index === i ? false : true}
              srcUrl={item.video}
              extraClass="absolute block h-full !w-full aspect-video object-cover"
            ></VideoPlayer>
          {:else}
            <img
              src={item.src}
              class="absolute block !w-full h-full object-cover"
              alt={item.title}
            />
          {/if}
        </div>
      </div>
    {/each}
    {#if items.length > 1}
      <button
        class="button button-next flex items-center justify-center text-dark-green text-opacity-40 active:text-opacity-100 md:hover:text-opacity-100 active:bg-primary-200 active:bg-opacity-50 md:hover:bg-primary-200 md:hover:bg-opacity-50 rounded-full h-12 w-12 absolute z-50 right-2 transfrom -translate-y-1/2 top-[50%] -rotate-90"
        type="button"
        title=" {$LL.carousel.nextItem()}"
        on:click={nextSlide}
      >
        <span class="sr-only"> {$LL.carousel.nextItem()}</span>
        <ChevronDownIcon className="h-5 w-5" /></button
      >
      <button
        class="button button-prev flex items-center justify-center text-dark-green text-opacity-40 active:text-opacity-100 md:hover:text-opacity-100 active:bg-primary-200 active:bg-opacity-50 md:hover:bg-primary-200 md:hover:bg-opacity-50 rounded-full h-12 w-12 absolute z-50 left-2 transfrom -translate-y-1/2 top-[50%] rotate-90"
        type="button"
        title=" {$LL.carousel.previousItem()}"
        on:click={prevSlide}
      >
        <span class="sr-only"> {$LL.carousel.previousItem()}</span>

        <ChevronDownIcon className="h-5 w-5" /></button
      >
    {/if}
  </div>
</div>

<slot {index} {changeSlide} />
