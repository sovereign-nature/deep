<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { getMultiTabsContext } from './context.js';
  import { cn } from '$lib/utils.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Carousel from '$lib/components/ui/carousel/index.js';
  import { SOCIAL_CARD_PLACEHOLDER } from '@sni/constants/cdn/placeholders';
  import NavSelect from '$lib/components/ui/multi-tabs/tabs-nav-select.svelte';
  import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Props = HTMLAttributes<HTMLDivElement>;

  let className: $$Props['class'] = undefined;
  let loaded = false;

  export { className as class };

  const { activeTab, startIndex, tabs, title } = getMultiTabsContext();
  const carouselWrapperClass =
    $title && $title.length > 0 ? 'xl:col-start-2' : '';
</script>

<div class="sm:hidden">
  {#if $tabs.length > 0}
    <NavSelect></NavSelect>
  {/if}
</div>

<div class="hidden sm:grid min-h-16 w-full grid-flow-row grid-cols-9 gap-4">
  {#if $title && $title.length > 0}
    <h2
      class="col-span-2 flex items-center text-xl text-gray-400 lg:flex xl:col-span-1"
    >
      {$title}
    </h2>
  {/if}

  <div class={cn('relative col-span-full ', carouselWrapperClass)}>
    {#if !loaded}
      <div class="flex flex-row gap-4 bg-pink h-20 items-stretch">
        <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
        {#each [1, 2, 3] as _}
          <div
            class="rounded overflow-hidden w-full h-20 bg-gray-200 dark:bg-deep-green-900"
          >
            <Skeleton className="w-full h-full"></Skeleton>
          </div>
        {/each}
      </div>
    {/if}
    <Carousel.Root
      opts={{
        align: 'start',
        duration: 40,
        loop: true,
        startIndex: $startIndex,
      }}
      class={cn('max-w-full', className, loaded ? 'visible' : 'hidden')}
      bind:activeItemIndex={$activeTab}
      on:init={() => (loaded = true)}
    >
      <Carousel.Content>
        {#each $tabs as item, index}
          <Carousel.Item {index} class="min-w-[200px] flex flex-row ">
            <div class=" w-full">
              <Card.Root
                class={`${$activeTab === index ? 'border-none transition dark:bg-opacity-60' : ' carousel-nav-card  bg-deep-green hover:dark:text-primary-300 hover:text-primary-300 border-none  bg-opacity-5 px-3 py-2 hover:bg-opacity-10 dark:bg-black dark:bg-opacity-20'} bg-deep-green my-0 mt-0 rounded px-4 py-4 font-serif text-sm text-gray-400 transition sm:px-6 sm:py-4 sm:text-base lg:text-xl xl:text-2xl dark:bg-black dark:text-gray-400`}
              >
                <Card.Content
                  class={`${$activeTab === index ? 'text-primary-300 dark:text-primary-200' : ''} flex flex-row items-center gap-4 p-0  `}
                >
                  <img
                    src={item.img ? item.img : SOCIAL_CARD_PLACEHOLDER}
                    alt={`${item.label} avatar`}
                    class={`${$activeTab === index ? 'opacity-100' : 'opacity-60'} aspect-square h-11 w-11 rounded-full object-cover transition-opacity md:h-12 md:w-12`}
                  />

                  <span class="text-nowrap"> {item.label} </span>
                </Card.Content>
              </Card.Root>
            </div>
          </Carousel.Item>
        {/each}
      </Carousel.Content>
      <Carousel.Previous
        class="bg-primary-300 left-1 border-none opacity-90 hover:opacity-100"
      />

      <Carousel.Next
        class="bg-primary-300 right-1 border-none opacity-90 hover:opacity-100"
      />
    </Carousel.Root>
  </div>
</div>
