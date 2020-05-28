<template>
  <div class="block-wrapper">
    <div v-if="title" class="block-title">
      {{ title }}
    </div>
    <div class="block">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="postcss" scoped>
.block-wrapper {
  @apply mb-4;
}

.block {
  @apply border border-gray-300 rounded-lg p-2 h-full;
}

.block-title {
  padding: 0 1rem 0.5rem 1rem;
  @apply font-bold;
}

@screen lg {
  .block {
    @apply p-6;
  }
}
</style>
