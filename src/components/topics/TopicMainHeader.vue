<template>
  <section class="mb-8 border-b border-gray-300 pb-4">
    <article class="text-3xl font-normal">
      {{ parentTopic.title }}
    </article>
    <section class="mt-2">
      <ul class="info-wrap">
        <li v-for="info in countInfo" :key="info.name">
          <p>
            {{ info.name }}
          </p>
          <p>
            {{ info.val }}
          </p>
        </li>
      </ul>
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
    },
    countInfo() {
      const counts = [
        {
          name: '조회수',
          val: this.parentTopic.views
        },
        {
          name: '작성일',
          val: this.$dayjs(this.parentTopic.createdAt).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        },
        {
          name: '작성자',
          val: this.parentTopic.ownerNickname
        }
      ]

      return counts
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

.info-wrap {
  & li {
    @apply inline-block;

    & p {
      @apply inline-block;

      &:first-of-type {
        @apply text-gray-700;
      }

      &:last-of-type {
        @apply text-black;
      }
    }

    &:not(:first-of-type) {
      @apply ml-3;
    }
  }
}
</style>
