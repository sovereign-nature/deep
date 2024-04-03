<script lang="ts">
  import { Drawer } from '@sni/ui-kit';
  import CloseIcon from '$lib/components/icons/CloseIcon.svelte';
</script>

<Drawer.Close
  class="absolute right-5 top-5 text-gray-200 hover:text-white  focus:outline-none whitespace-normal m-0.5 rounded-lg focus:ring-2 p-1.5 ms-auto flex items-center justify-center text-sm "
  ><span class="sr-only">Close claim modal</span>
  <CloseIcon className="w-5 h-5" />
</Drawer.Close>
