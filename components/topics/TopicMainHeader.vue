<template>
  <div class="mb-8">
    <div class="descriptor">
      <span>#{{ topicId }}</span>
      <span>{{ formatDate }}</span>
    </div>
    <div class="text-2xl font-bold">
      {{ title }}
    </div>
    <div class="mt-2">
      <div class="count-info-wrap">
        <div class="text-sm">
          <span class="text-gray-600">
            조회수
          </span>
          <span class="text-black text-base">
            {{ views }}
          </span>
        </div>
      </div>
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
    },
    views: {
      type: Number,
      required: true
    }
  },

  computed: {
    formatDate() {
      return this.$dayjs(this.createdAt).format('YYYY-MM-DD HH:MM:ss')
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

.count-info-wrap {
  @apply inline-block;

  &:not(:first-of-type) {
    @apply mx-1;
  }
}
</style>
