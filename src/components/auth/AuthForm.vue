<template>
  <div class="max-w-sm w-full px-4 py-8 bg-white rounded-lg shadow mx-2">
    <div class="text-2xl font-bold text-center mb-6">
      <slot name="header"></slot>
    </div>
    <slot name="default"></slot>
  </div>
</template>

<style lang="postcss" scoped>
form label {
  @apply text-gray-600 font-bold;
}
form label.no-validate {
  @apply text-red-500 font-bold;
}
form input[type='submit'] {
  @apply mt-4 py-4 bg-gray-700 text-white rounded-lg cursor-pointer;
}
form input[type='submit']:hover {
  @apply bg-gray-800;
}
form input[type='submit']:focus {
  @apply outline-none;
}
form input[type='submit']:disabled {
  @apply bg-gray-500;
}
form input:not([type='submit']) {
  @apply p-2 my-2 bg-gray-300 rounded;
}
form input:not([type='submit']):focus {
  @apply outline-none bg-gray-400;
}
</style>
