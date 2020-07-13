<template>
  <main class="mb-12">
    <CategoryPage :topics="topics" :pages="pages" />
  </main>
</template>

<script>
import CategoryPage from '@/components/topics/category/CategoryPage.vue'
import { fetchCategoryTopics } from '@/components/utils/functions/fetch'

export default {
  components: {
    CategoryPage
  },

  async asyncData({ $axios, params, query, error }) {
    try {
      const data = await fetchCategoryTopics(
        $axios,
        parseInt(params.id),
        query.p,
        false
      )

      return {
        topics: data.topics,
        pages: data.head
      }
    } catch (fetchError) {
      error(fetchError)
    }
  }
}
</script>
