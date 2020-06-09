<template>
  <div class="mb-6">
    <div class="descriptor">
      <span>#{{ topicId }}</span>
      <span>{{ formatDate }}</span>
    </div>
    <div class="text-xl font-bold">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    topicId: {
      type: Number,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    }
  },

  computed: {
    formatDate() {
      return (
        this.$dayjs(this.createdAt).format('YYYY-MM-DD HH:MM:ss') + '에 작성됨'
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
.descriptor > *:not(:first-child) {
  @apply mx-1;
}
.descriptor {
  @apply text-sm text-gray-500;
}
</style>
