<script lang="ts">
  export let checked = true;
  export let checkedLabel = 'on';
  export let uncheckedLabel = 'off';
  export let disabled = false;
  let id = 'toggle-switch-' + Math.floor(Math.random() * 1000);

  let labelClass = `text-center px-5 text-sm`;
  const toggleClass =
    'toggle-checkbox-slider absolute block w-1/2 shadow-sm z-10 rounded-lg transition-left duration-200 text-white bg-primary-400 hover:bg-primary-300';
</script>

<div
  class="relative select-none overflow-hidden bg-deep-green-600 shadow-inner rounded-lg h-9 min-w-24"
>
  <label
    for={id}
    class={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer '} toggle-label relative grid grid-cols-2 grid-rows-1 items-center h-full w-full z-20 font-aeonik `}
  >
    <span
      class={`${checked ? 'text-gray-100' : 'text-primary-300'} ${labelClass}`}
    >
      {checkedLabel}</span
    >
    <span
      class={`${checked ? 'text-primary-300' : 'text-deep-green-700'} ${labelClass}`}
    >
      {uncheckedLabel}</span
    >
  </label>
  <input
    type="checkbox"
    name="toggle"
    {disabled}
    {id}
    bind:checked
    class=" toggle-checkbox absolute checked:bg-none w-inherit invisible"
  />
  <span class={toggleClass}> </span>
</div>

<style>
  .toggle-checkbox:checked + .toggle-checkbox-slider {
    left: 0;
  }
  .toggle-checkbox:disabled + .toggle-checkbox-slider {
    opacity: 0.5;
  }

  .toggle-checkbox:focus {
    outline: none;
  }
  .toggle-checkbox:hover + .toggle-checkbox-slider {
    background-color: rgb(0 198 126);
  }
  .toggle-checkbox + .toggle-checkbox-slider {
    left: 50%;
    height: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
