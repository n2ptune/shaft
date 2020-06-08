<template>
  <div class="category-badge-wrapper">
    <div class="category-badge" :style="{ backgroundColor: badgeColor }"></div>
    <div class="category-badge-name">
      {{ badgeName }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    badgeColor: {
      type: String,
      required: true
    },
    badgeName: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.category-badge-wrapper {
  @apply flex items-center;
}

.category-badge {
  --category-badge-size: 0.4rem;

  width: var(--category-badge-size);
  height: var(--category-badge-size);

  @apply rounded-full mr-2;
}
</style>
