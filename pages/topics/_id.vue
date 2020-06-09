<template>
  <main>
    <div>
      <TopicMainHeader
        :title="topic.title"
        :topic-id="topic.id"
        :created-at="topic.createdAt"
      />
      <ParentTopic
        :user="{
          avatar: topic.ownerAvatar,
          nickname: topic.ownerNickname,
          email: topic.ownerEmail
        }"
        :content="topic.content"
      />
    </div>
    <!-- 부모 토픽 메인 -->
    <!-- 그 외 자식 토픽 -->
  </main>
</template>

<script>
import TopicMainHeader from '@/components/topics/TopicMainHeader'
import ParentTopic from '@/components/topics/ParentTopic'

export default {
  components: {
    TopicMainHeader,
    ParentTopic
  },

  async asyncData({ $axios, params, redirect }) {
    try {
      const { data: topic } = await $axios.get('/api/topics/' + params.id)

      return {
        topic
      }
    } catch (error) {
      redirect('/')
    }
  }
}
</script>

<style lang="postcss" scoped>
.topic-wrap {
  @apply border border-gray-300 rounded-lg p-2;
}
.topic-wrap.parent {
  border-top: 5px solid;
}
</style>
