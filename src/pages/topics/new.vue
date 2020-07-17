<template>
  <main class="container mx-auto mb-12">
    <ClientOnly>
      <EditorWrapper
        v-if="isLoadingEditData"
        :is-edit="topicDataToEdit"
        :is-reply="isReplyTopic"
      />
      <LoadingSpinner v-else class="mx-auto my-64" />
    </ClientOnly>
  </main>
</template>

<script>
import EditorWrapper from '@/components/topics/editor/EditorWrapper.vue'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'

export default {
  components: {
    EditorWrapper,
    LoadingSpinner
  },

  data: () => ({
    topicDataToEdit: null,
    isLoadingEditData: false
  }),

  computed: {
    isReplyTopic() {
      if (this.topicDataToEdit) {
        return !!this.topicDataToEdit.parentTopicID
      } else {
        return false
      }
    }
  },

  async created() {
    if (!this.$route.query.id) {
      this.isLoadingEditData = true
    } else if (process.client && this.$route.query.id) {
      // 유저 정보가 필요하므로 클라이언트 측에서
      // 토픽 값 가져오기 권한이 없으면 에러 페이지로 리다이렉트
      try {
        const { data: topicData } = await this.$axios.get(
          '/api/topics/update/' + this.$route.query.id
        )

        this.topicDataToEdit = topicData
        this.isLoadingEditData = true
      } catch (fetchError) {
        if (fetchError.response.status >= 400) {
          this.$nuxt.error({
            statusCode: fetchError.response.status,
            message: fetchError.response.data || fetchError.response.statusText
          })
        }
      }
    }
  }
}
</script>
