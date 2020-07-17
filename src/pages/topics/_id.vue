<template>
  <main>
    <section class="main-container">
      <section class="topic-container">
        <TopicMainHeader />
        <ParentTopic />
        <ChildrenTopic v-if="childrenLength" />
        <ClientOnly>
          <section class="reply-container">
            <EditorWrapper v-if="isLogin" is-reply no-border />
          </section>
        </ClientOnly>
      </section>
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

  async asyncData({ params, store, error }) {
    try {
      await store.dispatch('topic/fetchTopics', params.id)
    } catch (fetchError) {
      error({
        statusCode: fetchError.response.status,
        message: fetchError.response.data.message
      })
    }
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
@import '@/assets/css/topic/index.css';

.main-container {
  & >>> .topic-wrap.child:not(:last-of-type) {
    @apply border-b-2 border-gray-300 mb-8;
  }
}

.reply-container {
  @apply my-12;
}

@screen lg {
  .main-container {
    & .topic-container {
      width: calc(100% - 120px);

      & .topic-inner-container {
        @apply flex justify-between;

        & .topic-inner-left {
          width: calc(100% - 200px);
        }
        & .topic-inner-right {
          @apply block ml-6;
          width: 200px;
        }
      }
    }
  }
}
</style>
