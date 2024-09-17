<script lang="ts">
  import HexagonIcon from './icons/HexagonIcon.svelte';
  import LL from '$lib/shared/i18n/i18n-svelte';
  import { shareFile } from '$lib/features/UiActions';

  export let shareUrl: string = '';
  export let shareTitle: string = '';
  export let shareImage: string = '';
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
  <button
    class="social-button"
    data-umami-event="share-twitter"
    on:click={shareOnTwitter}
    title="Twitter"
  >
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
  <button
    class="social-button"
    data-umami-event="share-telegram"
    on:click={shareOnTelegram}
    title="Telegram"
  >
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

  <button
    class="social-button"
    data-umami-event="share-instagram"
    on:click={() =>
      shareFile(shareImage, shareTitle, $LL.social.shareImagePrefix())}
    title="Instagram"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 icon"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 3.918C0 1.75415 1.75415 0 3.918 0H16.082C18.2459 0 20 1.75415 20 3.918V16.082C20 18.2459 18.2459 20 16.082 20H3.918C1.75415 20 0 18.2459 0 16.082V3.918ZM14.3508 9.97722C14.3508 12.3675 12.4131 14.3052 10.0228 14.3052C7.63248 14.3052 5.69476 12.3675 5.69476 9.97722C5.69476 7.58692 7.63248 5.6492 10.0228 5.6492C12.4131 5.6492 14.3508 7.58692 14.3508 9.97722ZM15.1253 6.56036C14.1943 6.56036 13.4396 5.80567 13.4396 4.87472C13.4396 3.94376 14.1943 3.18907 15.1253 3.18907C16.0562 3.18907 16.8109 3.94376 16.8109 4.87472C16.8109 5.80567 16.0562 6.56036 15.1253 6.56036Z"
      />
    </svg>
    <HexagonIcon className="absolute text-white dark:text-black z-0" />
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
