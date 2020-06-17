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
      <article class="flex flex-wrap category-view-list-wrap">
        <CategoryViewList
          v-for="tag in sortedTopicTags"
          :key="tag.name"
          :tag="tag"
        />
      </article>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CategoryViewList from '@/components/topics/category/CategoryViewList'

export default {
  components: {
    CategoryViewList
  },

  computed: {
    ...mapGetters({
      parentTopic: 'topic/getParentTopic',
      topicTags: 'topic/getTopicsTag'
    }),
    formatDate() {
      return this.$dayjs(this.parentTopic.createdAt).format(
        'YYYY-MM-DD HH:mm:ss'
      )
    },
    sortedTopicTags() {
      const clone = this.topicTags.slice()

      clone.sort((a, b) => {
        if (a.isOrigin) {
          return -1
        } else if (b.isOrigin) {
          return 1
        } else {
          return parseInt(a.id) - parseInt(b.id)
        }
      })

      return clone
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
