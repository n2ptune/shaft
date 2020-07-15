<template>
  <main class="container mx-auto mb-12">
    <ClientOnly>
      <EditorWrapper />
    </ClientOnly>
  </main>
</template>

<script>
import EditorWrapper from '@/components/topics/editor/EditorWrapper.vue'

export default {
  components: {
    EditorWrapper
  },

  async created() {
    if (process.client && this.$route.query.id) {
      // 유저 정보가 필요하므로 클라이언트 측에서
      // 토픽 값 가져오기 권한이 없으면 에러 페이지로 리다이렉트
      try {
        const { data } = await this.$axios.get(
          '/api/topics/update/' + this.$route.query.id
        )

        console.log(data)
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
