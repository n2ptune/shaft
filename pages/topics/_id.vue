<template>
  <main>
    <div>
      <TopicMainHeader />
      <ParentTopic />
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

  async asyncData({ params, redirect, store }) {
    // try {
    //   const { data } = await $axios.get('/api/topics/' + params.id)
    //   const rootTopic = data.topics.root
    //   const childrenTopic = data.topics.children
    //   return {
    //     rootTopic,
    //     childrenTopic
    //   }
    // } catch (error) {
    //   redirect('/')
    // }

    await store.dispatch('topic/fetchTopics', params.id)
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
