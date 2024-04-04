<script lang="ts">
  import { SOCIAL_CARD_PLACEHOLDER } from '@sni/constants/cdn/placeholders';
  import { type MultiTabsTab } from './context.js';
  import * as Card from '$lib/components/ui/card';

  export let item: MultiTabsTab;
  export let active = true;
</script>

<Card.Root class="bg-deep-green text-primary-200 border-none w-full">
  <Card.Content class="p-4 flex flex-row justify-start gap-4 items-center">
    <img
      src={item.img ? item.img : SOCIAL_CARD_PLACEHOLDER}
      alt={`${item.label} avatar`}
      class={`${active ? 'opacity-100' : 'opacity-60'} aspect-square h-16 w-16 rounded-full object-cover transition-opacity`}
    />

    <span class="font-aeonik font-regular"> {item.label} </span>
  </Card.Content>
</Card.Root>
