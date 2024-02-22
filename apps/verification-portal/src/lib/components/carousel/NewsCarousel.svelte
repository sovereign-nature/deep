<script lang="ts">
  import { format, parseISO } from 'date-fns';
  import { track } from '@vercel/analytics';
  import Carousel from './Carousel.svelte';
  import Subheader from '$lib/shared/typography/Subheader.svelte';
  import CardHeader from '$lib/shared/typography/CardHeader.svelte';
  import { getAssetImageUrl } from '@sni/clients/images-client';
  import type { NewsEntity } from '$lib/types';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  import { dev } from '$app/environment';

  export let newsData: Array<NewsEntity>;
  let autoplay = true;
  let expanded = false;
  const cardHeaderClass = 'px-4 pt-6 sm:px-8 sm:pt-8 md:px-11 md:pt-11';

  let items = newsData.map((item, index) => ({
    index,
    date: format(parseISO(item?.date_created), 'd MMM yyyy'),
    src: getAssetImageUrl(item?.image), //@TODO placeholder image, maybe server side?
    title: item?.title,
    content: item?.content,
    video: item?.video,
  }));

  let hasBeenClicked = false; // Prevents double click
  function toggleExpanded(index: number) {
    if (hasBeenClicked) return;
    hasBeenClicked = true;
    expanded = !expanded;
    setTimeout(() => {
      hasBeenClicked = false;
    }, 200);
    if (!dev) {
      track('news_read_more', {
        title: items[index]?.title,
        expanded,
      });
    }
  }
  $: isSliding = autoplay && !expanded;
</script>

{#if items.length > 0}
  <div
    class="max-w-full space-y-4 backface-visibility-none"
    on:mouseenter={() => (autoplay = false)}
    on:mouseleave={() => (autoplay = true)}
    role="tablist"
    aria-label="News carousel"
    tabindex="0"
  >
    <Carousel
      {items}
      let:index
      let:changeSlide
      {isSliding}
      carouselClass={`md:rounded-b-none`}
    >
      <div class="pb-11">
        <div class={`${cardHeaderClass} mb-5 w-full cursor-default`}>
          <Subheader>{items[index]?.date}</Subheader>
          <CardHeader title={items[index]?.title} />
          <p class={`card-description ${expanded ? 'expanded' : 'collapsed'}`}>
            {items[index]?.content.length > 300
              ? expanded
                ? items[index]?.content
                : `${items[index]?.content.substring(0, 300)}...`
              : items[index]?.content}
          </p>
          <div class="flex flex-row justify-end">
            {#if items[index]?.content.length > 300}
              <button
                class="text-primary-400 text-sm me-6 mt-3"
                on:click={() => toggleExpanded(index)}
              >
                {expanded ? $LL.news.close() : $LL.news.readMore()}
              </button>
            {/if}
          </div>
        </div>
        {#if items.length > 1}
          <div class="flex justify-start space-x-2 px-4 sm:px-8 md:px-11">
            {#each items as item, i}
              <button
                class="w-3 h-3 rounded-full border block border-white {i ===
                index
                  ? 'bg-primary-400'
                  : 'bg-gray-300'}"
                title={item.title}
                on:click={() => changeSlide(i)}
              ></button>
            {/each}
          </div>
        {/if}
      </div>
    </Carousel>
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
