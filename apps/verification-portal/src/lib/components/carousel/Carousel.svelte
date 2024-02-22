<script lang="ts">
  import viewport from '$lib/features/useViewportActions';

  import { onDestroy, onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { Carousel } from 'flowbite';
  import VideoPlayer from '$lib/components/media/CloudflareStreamPlayer/VideoPlayer.svelte';
  import type { CarouselEntity } from '$lib/types';
  import { browser } from '$app/environment';

  import type {
    CarouselItem,
    CarouselOptions,
    CarouselInterface,
  } from 'flowbite';

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
  onMount(() => {
    const options: CarouselOptions = {
      defaultPosition: 0,
      interval: 6000,
      // callback functions
      onNext: () => {
        console.log('next slider item is shown');
      },
      onPrev: () => {
        console.log('previous slider item is shown');
      },
      onChange: (carousel) => {
        index = carousel._activeItem.position;
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
  class="relative w-full"
>
  <div
    class={`${carouselClass} relative overflow-hidden md:rounded-lg aspect-video w-full`}
  >
    {#each items as item, i}
      <div bind:this={carouselItemsInit[i].el} id={`slide-${i}`}>
        <div
          class={`${index === i ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        >
          {#if item.video}
            <VideoPlayer
              paused={index === i ? false : true}
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
  </div>
</div>
<slot {index} {changeSlide} />
