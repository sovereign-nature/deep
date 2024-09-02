<script lang="ts">
  import type { LocalizedString } from 'typesafe-i18n';
  // https://github.com/ivanhofer/typesafe-i18n/tree/main/packages/adapter-svelte#how-do-i-render-a-component-inside-a-translation
  export let message: LocalizedString;

  $: [prefix, infix, postfix] = message.split('<>') as LocalizedString[];
  // render infix only if the message doesn't have any split characters
  $: if (!infix && !postfix) {
    infix = prefix;
    prefix = '' as LocalizedString;
  }
</script>

{prefix}<slot {infix} />{postfix}
