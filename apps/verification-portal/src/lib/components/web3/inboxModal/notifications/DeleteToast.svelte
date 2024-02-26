<script lang="ts">
  import { Toast } from 'flowbite-svelte';
  import { fly } from 'svelte/transition';
  import { LL } from '$lib/shared/i18n/i18n-svelte';
  export let openToast = false;
  let counter = 5;

  export const show = () => {
    openToast = true;
    counter = 5;
    timeout();
  };

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    openToast = false;
  }
</script>

<Toast
  transition={fly}
  params={{ y: -200, axis: 'y', duration: 300 }}
  class=" rounded-lg flex  items-center w-full max-w-xs p-4 text-red-500 bg-white shadow dark:text-orange-500 dark:bg-black gap-3"
  bind:open={openToast}
>
  {$LL.notifications.deleted()}
</Toast>
