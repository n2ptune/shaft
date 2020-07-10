<template>
  <main class="mb-12">
    <div class="table-outer">
      <TopicTableWrapper>
        <template v-slot:descriptor> '{{}}' 카테고리 토픽 </template>
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
import { fetchCategoryTopics } from '@/components/utils/functions/fetch'

export default {
  components: {
    TopicTableWrapper,
    TopicTableItem,
    PageContainer
  },

  async asyncData({ $axios, params, query, error }) {
    try {
      const topics = await fetchCategoryTopics($axios, params.id, query.p)

      return {
        topics
      }
    } catch (fetchError) {
      error(fetchError)
    }
  }
}
</script>
