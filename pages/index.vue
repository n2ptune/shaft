<template>
  <main>
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

  async asyncData({ $axios }) {
    try {
      const { data: topicData } = await $axios.get('/api/topics')

      return {
        topics: topicData[0]
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
