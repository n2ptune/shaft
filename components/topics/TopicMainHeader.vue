<template>
  <div class="mb-8">
    <div class="descriptor">
      <span>#{{ parentTopic.topicId }}</span>
      <span>{{ formatDate }}</span>
    </div>
    <div class="text-2xl font-bold">
      {{ parentTopic.title }}
    </div>
    <div class="mt-2">
      <div class="count-info-wrap">
        <div class="text-sm">
          <span class="text-gray-600">
            조회수
          </span>
          <span class="text-black text-base">
            {{ parentTopic.views }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      parentTopic: 'topic/getParentTopic'
    }),
    formatDate() {
      return this.$dayjs(this.parentTopic.createdAt).format(
        'YYYY-MM-DD HH:mm:ss'
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

.count-info-wrap {
  @apply inline-block;

  &:not(:first-of-type) {
    @apply mx-1;
  }
}
</style>
