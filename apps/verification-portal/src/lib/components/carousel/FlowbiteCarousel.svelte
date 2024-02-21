<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { Carousel } from 'flowbite';
  import CloudflareStream from './CloudflareStreamPlayer.svelte';
  import type { CarouselEntity } from '$lib/types';

  import type {
    CarouselItem,
    CarouselOptions,
    CarouselInterface,
  } from 'flowbite';
  // import type { InstanceOptions } from 'flowbite';

  let carouselElement: HTMLElement | undefined = undefined;
  let carousel: CarouselInterface;
  let index = 0;
  export let items: CarouselEntity[];
  export let isSliding: boolean = true;
  export let carouselClass: string;
  $: toggleIsSliding(isSliding);

  let carouselItems: CarouselItem[] = items.map((item, index: number) => {
    return { position: index, el: document.createElement('div') };
  });

  // instance options object
  // const instanceOptions: InstanceOptions = {
  //   id: 'carousel-example',
  //   override: true,
  // };

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
    carousel = new Carousel(carouselElement, carouselItems, options);

    carousel.cycle();
  });
  onDestroy(() => {
    if (carousel) carousel.destroyAndRemoveInstance();
  });
</script>

<svelte:head>
  {#if items.length > 0}
    {#each items as image}
      <link rel="preload" href={image.src} as="image" />
    {/each}
  {/if}
</svelte:head>

<div bind:this={carouselElement} class="relative w-full">
  <div
    class={`${carouselClass} relative overflow-hidden rounded-lg h-56 md:h-96`}
  >
    {#each items as item, i}
      <div bind:this={carouselItems[i].el} id={`slide-${i}`}>
        <div
          class={`${index === i ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        >
          {#if item.video}
            <CloudflareStream
              paused={index === i ? false : true}
              extraClass="absolute block h-full !w-full aspect-video object-cover"
            ></CloudflareStream>
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
