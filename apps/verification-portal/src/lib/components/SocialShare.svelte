<script lang="ts">
  import HexagonIcon from './icons/HexagonIcon.svelte';
  import LL from '$lib/shared/i18n/i18n-svelte';

  export let shareUrl: string = '';

  // Function to share on Twitter
  function shareOnTwitter() {
    // Replace with your Twitter sharing logic
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent($LL.social.twitterPrefix())}`,
      '_blank'
    );
  }
  // Function to share on Telegram
  function shareOnTelegram() {
    // Replace with your Telegram sharing logic
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent($LL.social.telegramPrefix())}`,
      '_blank'
    );
  }
</script>

<div class="flex gap-2">
  <button class="social-button" on:click={shareOnTwitter} title="Twitter">
    <HexagonIcon className="absolute text-white dark:text-black z-0" />
    <svg
      class="w-5 h-5 icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
      />
    </svg>
  </button>
  <button class="social-button" on:click={shareOnTelegram} title="Telegram">
    <HexagonIcon className="absolute text-white dark:text-black z-0" />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 icon"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"
      />
    </svg>
  </button>
</div>

<style lang="postcss">
  .social-button {
    @apply text-center text-primary-400 w-12 h-12 cursor-pointer flex items-center justify-center transition-colors;
  }
  .social-button:hover {
    @apply text-primary-200;
  }

  .icon {
    z-index: 1;
    @apply relative;
  }
</style>
