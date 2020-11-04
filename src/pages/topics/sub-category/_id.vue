<template>
  <main class="mb-12">
    <CategoryPage :topics="topics" :pages="pages" @update="onUpdatePages" />
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
        0
      )

      return {
        topics: data.topics,
        pages: data.head
      }
    } catch (fetchError) {
      error(fetchError)
    }
  },

  methods: {
    onUpdatePages(data) {
      this.topics = data.topics
      this.pages = data.head
    }
  }
}
</script>
