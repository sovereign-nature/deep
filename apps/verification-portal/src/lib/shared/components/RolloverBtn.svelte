<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { goto } from '$app/navigation';

  const dispatch = createEventDispatcher();

  export let keepOpen = false;
  export let type: 'alert' | 'primary' | 'secondary' | string;
  export let hasNew = false;
  export let url: string = '';
  export let ariaLabel: string = '';
  export let className: string = '';
  export let customBtnClass: string = '';
  export let customIconClass: string = '';
  export let customLabelClass: string = '';
  export let disabled: boolean = false;

  $: isAlert = hasNew;

  let colorClasses = {
    alert: 'dark:text-white bg-orange-200 hover:bg-orange-100',
    primary:
      'drop-shadow-sm text-white bg-primary-400 hover:bg-primary-300 dark:bg-primary-400 dark:hover:bg-primary-300',
    secondary:
      'drop-shadow-sm hover:text-primary-400 text-primary-500 bg-white dark:text-primary-300 hover:dark:text-deep-green-800 dark:bg-deep-green-600 dark:hover:bg-primary-300',
  };

  $: alertAfter =
    type === 'alert'
      ? isAlert
        ? 'fill-orange-200 hover:fill-orange-100 dark:fill-orange-500 hover:dark:fill-orange-400'
        : 'fill-orange-200 hover:fill-orange-100 dark:fill-orange-700 dark:hover:fill-orange-600'
      : '';

  $: hasNewClass =
    type === 'alert'
      ? isAlert
        ? 'text-orange-500 hover:text-orange-400 dark:text-white hover:dark:text-white dark:bg-orange-500 dark:hover:bg-orange-400'
        : 'text-orange-700 hover:text-orange-500 dark:text-white hover:dark:text-white dark:bg-orange-700 dark:hover:bg-orange-600'
      : '';

  let isHovered = false;
  $: isOpen = keepOpen || isHovered;

  $: btnClass = `btn disabled:opacity-80 disabled:cursor-not-allowed ${
    colorClasses[type as 'alert' | 'primary' | 'secondary']
  } ${customBtnClass} ${hasNewClass} font-aeonik  text-base z-10 relative h-11  flex items-center justify-end rounded-full whitespace-nowrap overflow-hidden gap-2 px-3`;
</script>

<div class={`${className} ${alertAfter}  flex items-start`}>
  <div class="relative">
    <button
      type="button"
      {disabled}
      class={`${btnClass} ${$$slots.default && isOpen ? 'open' : 'closed'}`}
      on:click={() => {
        if (url) {
          goto(url);
        } else {
          dispatch('click');
        }
      }}
      on:mouseenter={() => {
        dispatch('mouseenter');
        isHovered = true;
      }}
      on:mouseleave={() => {
        dispatch('mouseleave');
        isHovered = false;
      }}
    >
      {#if isOpen && $$slots.default}
        <span
          transition:fly={{ y: 50, duration: 200, delay: 200 }}
          class={`${customLabelClass} ms-1 hidden md:block`}
        >
          <slot />
        </span>
      {/if}
      {#if $$slots.default}
        <span class={`${customLabelClass} ms-1  md:hidden`}>
          <slot />
        </span>
      {/if}
      <span class={`${customIconClass}`}>
        {#if ariaLabel}
          <span class="sr-only">{ariaLabel}</span>
        {/if}

        <slot name="icon" />
      </span>
    </button>
    {#if type === 'alert'}
      <svg
        width="17"
        height="14"
        viewBox="0 0 17 14"
        xmlns="http://www.w3.org/2000/svg"
        class={`alert-after z-0 absolute -right-1 bottom-0 ${
          disabled ? 'opacity-90' : ''
        } `}
      >
        <path
          d="M16.3873 13.3694C11.0463 12.636 5.46243 11.8693 0.396227 8.23369L11.9821 0.416809C7.7065 4.5336 16.3873 13.3694 16.3873 13.3694Z"
        />
      </svg>
    {/if}
  </div>
</div>

<style>
  @media (min-width: 768px) {
    .btn {
      transition: all 0.5s;
      max-width: 48px;
    }
  }
  .alert-after {
    transition: fill 0.5s;
  }
  .btn.open {
    max-width: 15rem;
  }
</style>
