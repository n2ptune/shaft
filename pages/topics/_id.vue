<template>
  <main>
    <div>
      <TopicMainHeader
        :title="rootTopic.title"
        :topic-id="rootTopic.id"
        :created-at="rootTopic.createdAt"
        :views="rootTopic.views"
      />
      <ParentTopic
        :user="{
          avatar: rootTopic.ownerAvatar,
          nickname: rootTopic.ownerNickname,
          email: rootTopic.ownerEmail,
          id: rootTopic.ownerID
        }"
        :topic="{
          id: rootTopic.id,
          likeCount: rootTopic.likeCount
        }"
        :content="rootTopic.content"
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
      const { data } = await $axios.get('/api/topics/' + params.id)

      const rootTopic = data.topics.root
      const childrenTopic = data.topics.children

      return {
        rootTopic,
        childrenTopic
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
