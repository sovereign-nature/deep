<script lang="ts">
  import { onMount } from 'svelte';
  import { Toggle } from 'flowbite-svelte';
  import { toast } from 'svelte-sonner';
  import { browser } from '$app/environment';
  import config from '$lib/shared/siteConfigs';
  import type { FeaturesConfig } from '$lib/types';
  import DoTphinTimelineWrapper from '$lib/widgets/DOTphin/TimelineWrapper.svelte';

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
  <div class="pt-10 max-w-xl mx-5">
    <h2 class="text-xl font-semibold">Test features</h2>
    <hr class="my-4" />
    <div>
      <h3>Toast</h3>
      <div class="flex gap-4 flex-wrap">
        <button
          class="p-2 bg-primary-300 text-black rounded-xl"
          on:click={() => toast('Hello world')}>Show toast</button
        >
        <button
          class="p-2 bg-primary-300 text-black rounded-xl"
          on:click={() => toast.success('Your settings have been saved')}
          >Success</button
        >

        <button
          class="p-2 bg-primary-300 text-black rounded-xl"
          on:click={() => toast.warning('Warning action')}>Warning</button
        >
        <button
          class="p-2 bg-primary-300 text-black rounded-xl"
          on:click={() => toast.error('Item has been deleted')}
          >Error/Delete
        </button>
        <button
          class="p-2 bg-primary-300 text-black rounded-xl"
          on:click={() =>
            toast.info('Useful info', { description: 'More info here' })}
          >Info</button
        >
        <button
          class="p-2 bg-primary-300 text-black rounded-xl"
          on:click={() =>
            toast.success('Long Description', {
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta optio recusandae, voluptate velit perferendis officiis ea temporibus repudiandae dolor quisquam. Quas sequi expedita nostrum excepturi quae esse aut provident facere.',
            })}>Long Description</button
        >

        <button
          class="p-2 bg-primary-300 text-black rounded-xl"
          on:click={() =>
            toast.success('The item has been created', {
              action: {
                label: 'See item',
                onClick: () => console.log('Toast Action'),
              },
            })}>With action</button
        >
      </div>
    </div>
  </div>
</div>

<DoTphinTimelineWrapper />
