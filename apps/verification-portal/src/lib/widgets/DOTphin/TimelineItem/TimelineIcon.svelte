<script lang="ts">
  import CheckMark from '$lib/components/icons/CheckMark.svelte';
  import LockIcon from '$lib/components/icons/LockIcon.svelte';

  export let itemState: 'complete' | 'active' | 'locked' = 'active';

  const wrapperClass = `flex absolute -start-3 justify-center items-center w-6 h-6  rounded-full`;
</script>

{#if itemState === 'complete'}
  <span class={`${wrapperClass} bg-deep-green-600`}>
    <CheckMark className="w-8 h-8 text-gray-300" />
  </span>
{:else if itemState === 'active'}
  <span class={`${wrapperClass} bg-primary-300 text-xs`}>
    <!-- <CheckMark className="w-8 h-8 text-gray-200" /> -->
  </span>
{:else}
  <span class={`${wrapperClass} bg-gray-300`}>
    <LockIcon className="w-4 h-4 text-deep-green" />
  </span>
{/if}
