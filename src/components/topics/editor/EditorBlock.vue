<template>
  <div class="block-wrapper">
    <div v-if="title" class="block-title">
      {{ title }}
    </div>
    <div class="block" :class="noBorder ? '' : 'border border-gray-400'">
      <slot />
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    noBorder: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="postcss" scoped>
.block-wrapper {
  @apply mb-4;
}

.block {
  @apply rounded-lg p-2 h-full;
}

.block-title {
  padding: 0 1rem 0.5rem 1rem;
  @apply font-bold mb-3;
}

@screen lg {
  .block {
    @apply p-6;
  }
}
</style>
