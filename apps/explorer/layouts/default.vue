<template>
  <div data-theme="garden" class="bg-neutral-focus">
    <SNIHeader></SNIHeader>
    <slot />
  </div>
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600&family=Playfair+Display:wght@400;500;700&display=swap');
html {
  font-family: 'Jost', sans-serif;
}
h1 {
  font-family: 'Playfair Display', serif;
}
::selection {
  color: white;
  background: #aae6b9;
}
</style>
