<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import SlideToggle from '$lib/shared/forms/SlideToggle.svelte';
  export let titleTab1: string = 'on';
  export let titleTab2: string = 'off';
  export let disabled = false;
  export let hideControls = false;

  let toggleTabs = true;

  let subTab1: HTMLElement;
  let subTab2: HTMLElement;
</script>

<div class="h-96 overflow-hidden">
  <div class="mb-4">
    <div class="flex justify-start items-center">
      <slot name="controls" />
      {#if toggleTabs}
        <div in:fade={{ duration: 200 }}>
          <slot name="controls-tab1" />
        </div>
      {:else}
        <div in:fade={{ duration: 200 }}>
          <slot name="controls-tab2" />
        </div>
      {/if}
      {#if !hideControls}
        <div class="ms-auto">
          <SlideToggle
            checkedLabel={titleTab1}
            uncheckedLabel={titleTab2}
            {disabled}
            bind:checked={toggleTabs}
          ></SlideToggle>
        </div>
      {/if}
    </div>
  </div>
  <div class="h-inherit overflow-x-hidden overflow-y-auto w-full relative pt-2">
    {#if toggleTabs}
      <div
        bind:this={subTab1}
        in:fly={{ x: -1000, duration: 500, opacity: 1 }}
        out:fly={{ x: -1000, duration: 500, opacity: 0 }}
        on:outrostart={() => subTab1.classList.add('absolute')}
        on:introstart={() => subTab1.classList.remove('absolute')}
        class="w-inherit top-0"
      >
        <slot name="tab1" />
      </div>
    {:else}
      <div
        bind:this={subTab2}
        in:fly={{ x: 1000, duration: 500, opacity: 1 }}
        out:fly={{ x: 1000, duration: 500, opacity: 0 }}
        on:outrostart={() => subTab2.classList.add('absolute')}
        on:introstart={() => subTab2.classList.remove('absolute')}
        class="w-inherit top-0"
      >
        <slot name="tab2" />
      </div>
    {/if}
  </div>
</div>
