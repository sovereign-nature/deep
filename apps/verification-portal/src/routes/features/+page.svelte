<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import config from '$lib/config/siteConfigs';
  import { Toggle } from 'flowbite-svelte';
  import type { FeaturesConfig } from '$lib/types';

  let featureState: FeaturesConfig = {};

  function setFeatureStateCookie() {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1); // Set the cookie to expire in 1 year
    document.cookie = `feature_flag=${encodeURIComponent(
      JSON.stringify(featureState)
    )}; expires=${date.toUTCString()}; path=/`;
  }

  onMount(() => {
    if (browser) {
      const featureFlagCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('feature_flag'));
      if (featureFlagCookie) {
        featureState = {
          ...config.feature,
          ...JSON.parse(decodeURIComponent(featureFlagCookie.split('=')[1])),
        };
      } else {
        // Initialize the cookie with the default feature state
        featureState = { ...config.feature };
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1); // Set the cookie to expire in 1 year
        document.cookie = `feature_flag=${encodeURIComponent(
          JSON.stringify(featureState)
        )}; expires=${date.toUTCString()}; path=/`;
      }
    }
  });

  function toggleFeature(feature: string) {
    featureState[feature] = !featureState[feature];
    setFeatureStateCookie();
  }
</script>

<div
  class="flex flex-col items-center justify-start pt-16 min-h-screen dark:text-white"
>
  <div>
    <h2 class="text-xl font-semibold">Enabled Features</h2>
    <a
      data-sveltekit-reload
      href="/"
      class="text-sm text-primary-400 hover:text-primary-200"
      >&#x2302; back to overview
    </a>
    <hr class="my-4" />
    <div class="flex flex-col gap-3">
      {#each Object.keys(featureState) as feature (feature)}
        {#key featureState}
          <Toggle
            checked={featureState[feature]}
            on:change={() => toggleFeature(feature)}>{feature}</Toggle
          >
        {/key}
      {/each}
    </div>
  </div>
</div>
