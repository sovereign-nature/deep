<script lang="ts">
  import Menu from '$lib/widgets/ThemeSwitch/Menu.svelte';
  import MobileMenu from '$lib/widgets/ThemeSwitch/MobileMenu.svelte';
  import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
  import SunIcon from '$lib/components/icons/SunIcon.svelte';
  import SystemIcon from '$lib/components/icons/SystemIcon.svelte';
  export let className: string | undefined = '';
</script>

<div class={className}>
  <div class="md:hidden">
    <MobileMenu>
      <svelte:fragment slot="system">
        <SystemIcon className="w-3 h-3 mx-1" />
      </svelte:fragment>
      <svelte:fragment slot="light">
        <SunIcon className="w-3 h-3 mx-1" />
      </svelte:fragment>
      <svelte:fragment slot="dark">
        <MoonIcon className="w-3 h-3 mx-1" />
      </svelte:fragment>
    </MobileMenu>
  </div>

  <Menu containerClass="hidden md:flex">
    <svelte:fragment slot="system">
      <SystemIcon className="w-4 h-4 mx-1" />
    </svelte:fragment>
    <svelte:fragment slot="light">
      <SunIcon className="w-4 h-4 mx-1" />
    </svelte:fragment>
    <svelte:fragment slot="dark">
      <MoonIcon className="w-4 h-4 mx-1" />
    </svelte:fragment>
  </Menu>
</div>
