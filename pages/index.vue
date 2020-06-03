<template>
  <main>
    <div class="table-outer">
      <TopicTableWrapper />
    </div>
  </main>
</template>

<script>
import TopicTableWrapper from '@/components/topics/TopicTableWrapper'

export default {
  components: {
    TopicTableWrapper
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
