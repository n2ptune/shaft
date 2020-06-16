<template>
  <section class="mb-8">
    <article class="descriptor">
      <span>#{{ parentTopic.id }}</span>
      <span>{{ formatDate }}</span>
    </article>
    <article class="text-2xl font-bold">
      {{ parentTopic.title }}
    </article>
    <section class="mt-2">
      <section class="count-info-wrap">
        <article class="text-sm">
          <span class="text-gray-600">
            조회수
          </span>
          <span class="text-black text-base">
            {{ parentTopic.views }}
          </span>
        </article>
      </section>
    </section>
    <section v-if="topicTags" class="mt-4">
      <article>
        태그 테스트
      </article>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      parentTopic: 'topic/getParentTopic',
      topicTags: 'topic/getTopicsTag'
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
