<script lang="ts">
  import { SOCIAL_CARD_PLACEHOLDER } from '@sni/constants/cdn/placeholders';

  import { isLongTitle } from '$lib/shared/utils';

  import LL from '$lib/shared/i18n/i18n-svelte';

  export let title = '';
  export let baseFontSize = 'text-72px'; // Default font size
  export let img = SOCIAL_CARD_PLACEHOLDER;

  let fontSizeClass = baseFontSize;

  $: imageUrl = img;

  const mediumTitle = isLongTitle(title);
  const smallTitle = isLongTitle(title, 9, 3);
  const sourceText = $LL.social.og.source()
    ? $LL.social.og.source()
    : 'Source:';

  const fundsText = $LL.social.og.fundsGenerated()
    ? $LL.social.og.fundsGenerated()
    : 'Total funds generated to date:';
  const tokenText = $LL.social.og.token() ? $LL.social.og.token() : 'Token ID:';

  if (smallTitle) {
    fontSizeClass = 'text-48px'; // Small font size
  } else if (mediumTitle) {
    fontSizeClass = 'text-62px'; // Medium font size
  }
</script>

<slot {imageUrl} {sourceText} {tokenText} {fundsText} {fontSizeClass} />
