<template>
  <main class="mb-12">
    <div class="table-outer">
      <TopicTableWrapper>
        <template v-slot:descriptor>
          모든 카테고리 토픽
        </template>
        <template v-slot:default>
          <TopicTableItem
            v-for="topic in topics"
            :key="topic.id"
            :item="topic"
          />
        </template>
      </TopicTableWrapper>
    </div>
  </main>
</template>

<script>
import TopicTableWrapper from '@/components/topics/TopicTableWrapper'
import TopicTableItem from '@/components/topics/TopicTableItem'

export default {
  components: {
    TopicTableWrapper,
    TopicTableItem
  },

  async asyncData({ $axios, store, query }) {
    try {
      const offset = query.offset ? query.offset : 0

      const { data: topicData } = await $axios.get('/api/topics', {
        params: {
          offset
        }
      })

      // await store.commit('topic/setTopicHeader', topicData.head)

      return {
        topics: topicData.topics
      }
    } catch (error) {}
  }
}
</script>
