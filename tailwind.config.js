/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin,
  ],
}
