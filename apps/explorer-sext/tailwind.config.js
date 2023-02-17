/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './*.vue',
    './node_modules/flowbite.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
