<template>
  <section class="my-12">
    <article>
      <div class="title">
        Top Tags
        <span class="text-gray-600 text-sm font-normal"
          >( {{ tags.length }} )</span
        >
      </div>
      <ul class="py-6">
        <nuxt-link
          v-for="tag in sortedTags"
          :key="tag.title"
          :to="{ path: categoryRoute(tag), query: { p: 1 } }"
        >
          <li class="inline-block mr-2 mb-2">
            <button
              class="px-4 py-1 font-light text-sm bg-orange-400 rounded-full text-white hover:bg-orange-500"
            >
              <span
                :style="{ paddingRight: '0.4rem' }"
                class="mr-2 pl-2 rounded-lg bg-orange-200 text-black text-xs text-center align-baseline"
              >
                {{ tag.count }}
              </span>
              {{ tag.title }}
            </button>
          </li>
        </nuxt-link>
      </ul>
    </article>
    <article>
      <div class="title">
        Top Topics
      </div>
      <ul class="py-6">
        <li v-for="topic in sortedTopics" :key="topic.id" class="mb-4">
          <div
            class="inline-block align-middle cursor-pointer"
            @click="moveTopic(topic)"
          >
            <fa
              :icon="
                topic.parentTopicID
                  ? ['fas', 'comment-dots']
                  : ['fas', 'question-circle']
              "
              :class="
                topic.parentTopicID ? 'text-yellow-500' : 'text-green-600'
              "
              class="mr-1"
            />
            <span>
              {{ topic.title }}
            </span>
            <span class="text-gray-500 ml-2">
              {{ convertDateRelativeTime(topic.createdAt) }}
            </span>
          </div>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
import relativeTime from 'dayjs/plugin/relativeTime'

export default {
  props: {
    topics: {
      type: Array,
      required: true
    },
    tags: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  computed: {
    sortedTags() {
      return this.tags.slice().sort((a, b) => (a.count > b.count ? -1 : 1))
    },
    sortedTopics() {
      const arr = this.topics
        .slice()
        .sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
        )

      return arr
    }
  },

  created() {
    this.$dayjs.extend(relativeTime)
  },

  methods: {
    convertDateRelativeTime(date) {
      return this.$dayjs().to(this.$dayjs(date))
    },
    moveTopic(topic) {
      const routeBase = '/topics'
      const id = topic.parentTopicID
        ? `/${topic.parentTopicID}#${topic.id}`
        : `/${topic.id}`
      const mixRoute = routeBase + id

      this.$router.push({
        path: mixRoute
      })
    },
    categoryRoute(tag) {
      return tag.isOrigin
        ? `/topics/category/${tag.id}`
        : `/topics/sub-category/${tag.id}`
    }
  }
}
</script>

<style lang="postcss" scoped>
article {
  @apply my-6;
}
div.title {
  @apply font-bold text-lg py-4 border-b border-gray-400;
}
</style>
