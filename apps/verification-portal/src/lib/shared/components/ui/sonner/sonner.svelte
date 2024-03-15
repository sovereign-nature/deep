<script lang="ts">
  import {
    Toaster as Sonner,
    type ToasterProps as SonnerProps,
  } from 'svelte-sonner';
  import { themeStore } from '$lib/features/themeSwitch';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Props = SonnerProps;
  // read more about configs https://github.com/wobsoriano/svelte-sonner
</script>

<Sonner
  theme={$themeStore}
  class="toaster group custom-toast"
  closeButton={true}
  toastOptions={{
    unstyled: true,
    classes: {
      title: 'pe-5',
      toast:
        'p-5 w-full overflow-hidden text-xs dark:text-white border dark:border-deep-green-900 flex items-center gap-6 box-shadow-xl color-base p-4 bg-white dark:bg-deep-green-300 rounded-lg  toast bg-background text-foreground  shadow-lg',
      description: 'pe-5 ',
      actionButton:
        '!bg-primary opacity-80 hover:opacity-100 text-xs !text-deep-green !me-5',
      closeButton: '!bg-transparent !text-gray-500  !border-none !top-[50%] ',
      cancelButton:
        ' group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
    },
  }}
  {...$$restProps}
>
  <svg
    slot="success-icon"
    class=" "
    width="31"
    height="31"
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.5 0C6.93958 0 0 6.93958 0 15.5C0 24.0605 6.93958 31 15.5 31C24.0605 31 31 24.0605 31 15.5C31 6.93958 24.0605 0 15.5 0ZM22.595 12.1489L13.1203 21.6061L7.53146 16.0277L9.34008 14.2121L13.1203 17.9852L20.7863 10.3334L22.595 12.1489Z"
      fill="#08FFA6"
    />
  </svg>

  <svg
    slot="error-icon"
    width="31"
    height="31"
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.5 0C6.93958 0 0 6.93958 0 15.5C0 24.0605 6.93958 31 15.5 31C24.0605 31 31 24.0605 31 15.5C31 6.93958 24.0605 0 15.5 0ZM22.3027 20.4319L17.371 15.5L22.3027 10.5682L20.4534 8.71875L15.5215 13.6506L10.5897 8.71875L8.74023 10.5682L13.6721 15.5L8.74023 20.4319L10.5897 22.2812L15.5215 17.3495L20.4534 22.2812L22.3027 20.4319Z"
      fill="#FF5851"
    />
  </svg>
  <svg
    slot="warning-icon"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 15.5C0 6.93958 6.93958 0 15.5 0C24.0605 0 31 6.93958 31 15.5C31 24.0605 24.0605 31 15.5 31C6.93958 31 0 24.0605 0 15.5ZM17 8V18H14V8H17ZM15.5 23C16.3284 23 17 22.3284 17 21.5C17 20.6716 16.3284 20 15.5 20C14.6716 20 14 20.6716 14 21.5C14 22.3284 14.6716 23 15.5 23Z"
      fill="#FD854B"
    />
  </svg>
  <svg
    slot="info-icon"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 15.5C0 6.93958 6.93958 0 15.5 0C24.0605 0 31 6.93958 31 15.5C31 24.0605 24.0605 31 15.5 31C6.93958 31 0 24.0605 0 15.5ZM17 8V18H14V8H17ZM15.5 23C16.3284 23 17 22.3284 17 21.5C17 20.6716 16.3284 20 15.5 20C14.6716 20 14 20.6716 14 21.5C14 22.3284 14.6716 23 15.5 23Z"
      fill="#08FFA6"
    />
  </svg>
</Sonner>
