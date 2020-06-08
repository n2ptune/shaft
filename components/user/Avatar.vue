<template>
  <img :class="isRounded ? 'rounded-full' : ''" :src="src" :alt="alt" />
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
    }
  }
}
</script>

<style lang="postcss" scoped>
img {
  width: 2rem;
  height: auto;
  border: 2px solid white;
}
</style>
