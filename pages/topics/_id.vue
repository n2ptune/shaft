<template>
  <main>
    <div>
      <TopicMainHeader
        :title="topic.title"
        :topic-id="topic.id"
        :created-at="topic.createdAt"
        :views="topic.views"
      />
      <ParentTopic
        :user="{
          avatar: topic.ownerAvatar,
          nickname: topic.ownerNickname,
          email: topic.ownerEmail,
          id: topic.ownerID
        }"
        :topic="{
          id: topic.id,
          likeCount: topic.likeCount
        }"
        :content="topic.content"
      />
    </div>
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
  @apply border border-gray-300 rounded py-1 px-4;
}

.topic-wrap.parent,
.topic-wrap.child {
  border-top-width: 5px;
  border-top-style: solid;
}

.topic-wrap.parent {
  border-top-color: theme('colors.orange.400');
}

.topic-wrap.child {
  border-top-color: theme('colors.teal.300');
}
</style>
