<template>
  <div class="max-w-4xl w-full bg-white mx-2 rounded-lg shadow-xl relative">
    <div class="flex flex-col lg:flex-row lg:items-center">
      <div class="left-area">
        <slot name="header" />
      </div>
      <div class="right-area px-6 py-8 w-full lg:px-24">
        <slot name="default" />
      </div>
    </div>
    <div class="hidden lg:inline-block absolute bottom-0 right-0">
      <img
        src="~@/assets/images/logo_light_orange.png"
        :style="{ opacity: '0.5' }"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
form label {
  @apply text-gray-600;
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
.left-area {
  width: 100%;
  height: 350px;
  background: url('~@/assets/images/auth-left.jpg');
  background-color: transparent;
  background-size: cover;
  background-position: center center;

  @apply text-center relative rounded-tl-lg rounded-tr-lg;

  &::before {
    content: '';
    background-color: rgba(0, 0, 0, 0.35);

    @apply w-full h-full block absolute rounded-tl-lg rounded-tr-lg;
  }
}
@screen lg {
  .left-area {
    width: 650px;
    height: 700px;

    @apply rounded-bl-lg rounded-tr-none;

    &::before {
      @apply rounded-bl-lg rounded-tr-none;
    }
  }
}
</style>
