<template>
  <div class="table-outer">
    <TopicTableWrapper>
      <template v-slot:descriptor>
        '{{ pages.categoryName }}' 카테고리 토픽
      </template>
      <template v-slot:default>
        <TopicTableItem v-for="topic in topics" :key="topic.id" :item="topic" />
      </template>
    </TopicTableWrapper>
    <PageContainer
      :current-page="pages.currentPage"
      :pages="pages.countOfPage"
      :move-route="{ path: computedMoveRoutePath, queryName: 'p' }"
    />
  </div>
</template>

<script>
import TopicTableWrapper from '@/components/topics/TopicTableWrapper.vue'
import TopicTableItem from '@/components/topics/TopicTableItem.vue'
import PageContainer from '@/components/utils/PageContainer.vue'

export default {
  components: {
    TopicTableWrapper,
    TopicTableItem,
    PageContainer
  },

  props: {
    topics: {
      type: Array,
      required: true
    },
    pages: {
      type: Object,
      required: true
    }
  },

  computed: {
    computedMoveRoutePath() {
      if (this.$route.path.indexOf('/category/')) {
        return '/topics/category/' + this.$route.params.id
      } else if (this.$route.path.indexOf('/sub-category/')) {
        return '/topics/sub-category' + this.$route.params.id
      } else {
        return ''
      }
    }
  }
}
</script>
