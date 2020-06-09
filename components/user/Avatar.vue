<template>
  <img :class="[isRounded ? 'rounded-full' : '', size]" :src="src" :alt="alt" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: false,
      default: null
    },
    isRounded: {
      type: Boolean,
      required: false,
      default: true
    },
    size: {
      type: String,
      required: false,
      default: 'base'
    }
  }
}
</script>

<style lang="postcss" scoped>
img {
  height: auto;
  border: 2px solid white;

  &.base {
    width: 2rem;
  }

  &.sm {
    width: 1.5rem;
  }

  &.lg {
    width: 2.5rem;
  }

  &.xl {
    width: 2.75rem;
  }
}
</style>
