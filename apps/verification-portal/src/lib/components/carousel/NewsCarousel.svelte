<script lang="ts">
  import { format, parseISO } from 'date-fns';
  import { track } from '@vercel/analytics';
  import Carousel from './Carousel.svelte';
  import Subheader from '$lib/shared/typography/Subheader.svelte';
  import CardHeader from '$lib/shared/typography/CardHeader.svelte';
  import { generateAssetURL } from '$lib/shared/utils';
  import type { NewsEntity } from '$lib/types';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import { dev } from '$app/environment';

  export let newsData: Array<NewsEntity>;
  let autoplay = true;
  let index = 0;
  let expanded = false;
  const cardHeaderClass = 'px-4 pt-6 sm:px-8 sm:pt-8 md:px-11 md:pt-11';

  let images = newsData.map((item, index) => ({
    index,
    date: format(parseISO(item?.date_created), 'd MMM yyyy'),
    src: generateAssetURL(item?.image), //@TODO placeholder image, maybe server side?
    title: item?.title,
    content: item?.content,
  }));

  let mouseCursor =
    images && images.length > 1 ? 'cursor-pointer' : 'cursor-default';

  function updateSlide(slide: number) {
    index = slide;
  }
  let hasBeenClicked = false; // Prevents double click
  function toggleExpanded() {
    if (hasBeenClicked) return;
    hasBeenClicked = true;
    expanded = !expanded;
    setTimeout(() => {
      hasBeenClicked = false;
    }, 200);
    if (!dev) {
      track('news_read_more', {
        title: images[index]?.title,
        expanded,
      });
    }
  }
</script>

{#if images.length > 0}
  <div
    class="max-w-full space-y-4 backface-visibility-none pb-11"
    on:mouseenter={() => (autoplay = false)}
    on:mouseleave={() => (autoplay = true)}
    role="tablist"
    aria-label="News carousel"
    tabindex="0"
  >
    <Carousel
      {images}
      {index}
      duration={autoplay && !expanded ? 5000 : undefined}
      transition={null}
      on:change={({ detail }) => (index = detail.index)}
      class={`rounded-b-none ${mouseCursor}`}
    >
      <div class={`${cardHeaderClass} mb-5 w-full cursor-default`}>
        <Subheader>{images[index]?.date}</Subheader>
        <CardHeader title={images[index]?.title} />
        <p class={`card-description ${expanded ? 'expanded' : 'collapsed'}`}>
          {images[index]?.content.length > 300
            ? expanded
              ? images[index]?.content
              : `${images[index]?.content.substring(0, 300)}...`
            : images[index]?.content}
        </p>
        <div class="flex flex-row justify-end">
          {#if images[index]?.content.length > 300}
            <button
              class="text-primary-400 text-sm me-6 mt-3"
              on:click={toggleExpanded}
            >
              {expanded ? $LL.news.close() : $LL.news.readMore()}
            </button>
          {/if}
        </div>
      </div>
    </Carousel>

    {#if images.length > 1}
      <div class="flex justify-start space-x-2 px-4 sm:px-8 md:px-11">
        {#each images as image, i}
          <button
            class="w-3 h-3 rounded-full border block border-white {i === index
              ? 'bg-primary-400'
              : 'bg-gray-300'}"
            title={image.title}
            on:click={() => updateSlide(i)}
          ></button>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .card-description {
    transition: height 0.5s ease-in-out;
    overflow: hidden;
  }

  .expanded {
    height: auto;
  }

  .collapsed {
    @apply line-clamp-4;
    height: 6rem; /* Approx. 3 lines of text */
  }
</style>
