<script lang="ts">
  import NavBar from '$lib/components/NavBar.svelte';
</script>

<div class="dark w-full flex flex-col min-h-screen content-center bg-Sni-img">
  <NavBar themeSwitch={false}></NavBar>
  <div
    class="container flex-1 flex flex-col justify-start px-5 mt-[5vh] sm:pt-4 pb-8 xl:pb-36"
  >
    <div class="w-full lg:w-4/5 mx-auto">
      <div>
        <slot />
      </div>
    </div>
  </div>
</div>
