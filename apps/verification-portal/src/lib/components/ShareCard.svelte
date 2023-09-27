<!-- ShareCard.svelte -->

<script>
  export let title = 'Sovereign Nature Initiative'; //max 40 characters
  export let description =
    'Building an eco-data pipeline to connect real life ecology and the digital world'; //max 200 characters
  export let image = '/images/social_share_card.jpg';
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

  <!-- Fallback Data -->
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>
