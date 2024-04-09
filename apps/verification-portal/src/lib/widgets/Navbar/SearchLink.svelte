<script>
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
  import LL from '$lib/shared/i18n/i18n-svelte';
</script>

<div class=" flex items-center justify-start gap-5 text-white">
  <div
    class="bg-deep-green-600 text-primary-400 rounded-full h-8 w-8 flex items-center justify-center flex-none"
  >
    <SearchIcon className="h-3.5 w-3.5" />
  </div>
  <a
    class="font-serif text-base hover:text-primary active:text-primary"
    href="/"
  >
    {$LL.searchForTokens()}
  </a>
</div>
