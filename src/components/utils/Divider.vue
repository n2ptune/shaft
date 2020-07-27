<template>
  <div class="divider" v-text="text"></div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="postcss" scoped>
.divider {
  @apply my-6 flex items-center text-gray-500 text-sm;

  &::before {
    @apply mr-4;
  }

  &::after {
    @apply ml-4;
  }

  &::before,
  &::after {
    content: '';

    @apply h-px bg-gray-400 flex-1;
  }
}
</style>
