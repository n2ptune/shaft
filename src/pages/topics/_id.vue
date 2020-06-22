<template>
  <main>
    <section class="topic-container">
      <TopicMainHeader />
      <ParentTopic />
      <ChildrenTopic v-if="childrenLength" />
      <ClientOnly>
        <section class="reply-container">
          <EditorWrapper v-if="isLogin" is-reply />
        </section>
      </ClientOnly>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import TopicMainHeader from '@/components/topics/TopicMainHeader'
import ParentTopic from '@/components/topics/ParentTopic'
import ChildrenTopic from '@/components/topics/ChildrenTopic'
import EditorWrapper from '@/components/topics/editor/EditorWrapper'

export default {
  components: {
    TopicMainHeader,
    ParentTopic,
    ChildrenTopic,
    EditorWrapper
  },

  async asyncData({ params, redirect, store }) {
    await store.dispatch('topic/fetchTopics', params.id)
  },

  computed: {
    ...mapGetters({
      childrenLength: 'topic/getChildrenTopicsLength',
      isLogin: 'auth/getIsLogin'
    })
  },

  async beforeDestroy() {
    await this.$store.dispatch('topic/clearTopics')
  }
}
</script>

<style lang="postcss" scoped>
.topic-wrap,
section >>> .topic-wrap {
  @apply border border-gray-300 rounded py-1 px-4;

  &.parent,
  &.child {
    border-top-width: 5px;
    border-top-style: solid;
  }

  &.parent {
    border-top-color: theme('colors.orange.400');
  }

  &.child {
    border-top-color: theme('colors.blue.300');
  }

  &:not(:first-child) {
    @apply my-12;
  }
}

.reply-container {
  @apply my-12;
}
</style>
