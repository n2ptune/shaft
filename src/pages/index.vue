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
      <PageContainer
        :current-page="pages.currentPage"
        :pages="pages.countOfPage"
        :move-route="{ path: '/', queryName: 'o' }"
      />
    </div>
  </main>
</template>

<script>
import TopicTableWrapper from '@/components/topics/TopicTableWrapper'
import TopicTableItem from '@/components/topics/TopicTableItem'
import PageContainer from '@/components/utils/PageContainer'

async function fetchTopics(axios, offset) {
  const { data } = await axios.get('/api/topics', {
    params: {
      o: offset
    }
  })

  return data
}

export default {
  components: {
    TopicTableWrapper,
    TopicTableItem,
    PageContainer
  },

  async asyncData({ $axios, store, query, route }) {
    try {
      const offset = query.o || 1

      const data = await fetchTopics($axios, offset)

      if (process.server) {
        return {
          topics: data.topics,
          pages: data.head
        }
      }
    } catch (error) {}
  },

  watch: {
    async '$route.query'(to, from) {
      const data = await fetchTopics(this.$axios, to.o)
      this.topics = data.topics
      this.pages = data.head
    }
  },

  created() {
    this.$router.push({
      path: '/',
      query: {
        o: this.$route.query.o || 1
      }
    })
  }
}
</script>
