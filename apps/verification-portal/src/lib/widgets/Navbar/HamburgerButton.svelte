<script>
  export let open = false;
</script>

<button
  class={`${open ? 'open ' : 'closed '} nav-hamburger  md:hidden  text-deep-green dark:text-gray-300`}
  on:click
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      id="hm-top"
      y="15.1365"
      width="18"
      height="2.45455"
      fill="currentColor"
    />
    <rect
      id="hm-center"
      y="7.77271"
      width="18"
      height="2.45455"
      fill="currentColor"
    />
    <rect
      id="hm-bottom"
      y="0.40918"
      width="18"
      height="2.45455"
      fill="currentColor"
    />
  </svg>
</button>

<style>
  svg rect {
    transition:
      transform 0.3s ease-in-out,
      opacity 0.1s ease-in;
  }
  #hm-top {
    transform-origin: 0% 100%;
    transition: transform 0.3s ease-in-out;
  }
  .open #hm-top {
    transform: translate(3px, -1.5px) rotate(-45deg);
  }

  .open #hm-center {
    opacity: 0;
  }

  .open #hm-bottom {
    transform: translate(3px, 1.5px) rotate(45deg);
  }
</style>
