<script lang="ts">
  export let className: string = '';
  export let colorStart = 'rgba(255, 255, 255, 0.1)';
  export let colorEnd = 'rgba(255, 255, 255, 0)';
</script>

<div
  class="{className} placeholder"
  style="--gradient-color-start: {colorStart}; --gradient-color-end: {colorEnd};"
>
  <slot />
</div>

<style>
  .placeholder {
    position: relative;
    width: 100%;
    min-height: inherit;
    display: block;
    background: linear-gradient(
      to right,
      var(--gradient-color-start),
      var(--gradient-color-end),
      var(--gradient-color-start)
    );
    background-size: 200% 100%;
    animation: placeholderAnimation 3s linear infinite;
  }
  @keyframes placeholderAnimation {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
</style>
