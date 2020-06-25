<template>
  <main>
    <section class="main-container">
      <aside class="side-container">
        <div class="side-inner">
          <LeftSidebar />
        </div>
      </aside>
      <section class="topic-container">
        <TopicMainHeader />
        <section class="topic-inner-container">
          <section class="topic-inner-left">
            <ParentTopic />
            <ChildrenTopic v-if="childrenLength" />
            <ClientOnly>
              <section class="reply-container">
                <EditorWrapper v-if="isLogin" is-reply no-border />
              </section>
            </ClientOnly>
          </section>
          <section class="topic-inner-right">
            Related Topics
          </section>
        </section>
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
import LeftSidebar from '@/components/layouts/topic/LeftSidebar'

export default {
  components: {
    TopicMainHeader,
    ParentTopic,
    ChildrenTopic,
    EditorWrapper,
    LeftSidebar
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
.main-container {
  @apply flex justify-between;

  & .side-container {
    @apply hidden;

    & .side-inner {
      position: sticky;
    }
  }

  & .topic-container {
    width: 100%;

    & .topic-inner-container {
      & .topic-inner-left {
        width: 100%;
      }
      & .topic-inner-right {
        @apply hidden;
      }
    }
  }

  & >>> .topic-wrap.child:not(:last-of-type) {
    @apply border-b-2 border-gray-300 mb-8;
  }
}

.reply-container {
  @apply my-12;
}

@screen md {
  .main-container {
    & .side-container {
      @apply block border-r border-gray-300 mr-8;
      width: 120px;

      & .side-inner {
        @apply text-sm;
        top: 50px;
        position: sticky;
      }
    }
  }
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
