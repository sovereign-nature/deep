<!-- ShareCard.svelte -->

<script lang="ts">
  import { SOCIAL_CARD_PLACEHOLDER } from '@sni/constants/cdn/placeholders';
  import LL from '$lib/i18n/i18n-svelte';
  export let title: string = $LL.social.shareCard.title(); //max 40 characters
  export let description: string = $LL.social.shareCard.description(); //max 200 characters
  export let image = SOCIAL_CARD_PLACEHOLDER;
  export let twitterSite = '@sovereignnature';
</script>

<svelte:head>
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  <meta name="twitter:site" content={twitterSite} />

  <!-- Facebook Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://real.sovereignnature.com" />

  <!-- Fallback Data -->
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>
