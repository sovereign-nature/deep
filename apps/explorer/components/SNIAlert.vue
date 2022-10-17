<template>
  <div class="toast toast-top z-20 w-1/3">
    <div class="alert alert-error shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <p class="font-bold">Ooops! Something went wrong</p>
          <p>We're facing an issue with our servers, please try again</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// TODO: Implement real messages when we have some
// defineProps({
//   error: {
//     type: String,
//     required: false,
//     default: String
//   }
// })
</script>
