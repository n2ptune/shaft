<template>
  <section class="children-wrap">
    <div class="my-6 font-normal text-xl">
      {{ childrenLength }} Child Topics
    </div>
    <Topic
      v-for="topic in topics"
      :key="topic.id"
      :avatar="topic.ownerAvatar"
      :nickname="topic.ownerNickname"
      :email="topic.ownerEmail"
      :owner-id="topic.ownerID"
      :topic-id="topic.id"
      :like-count="topic.likeCount"
      :parent="topic.parentTopicID"
      :comments="topic.comments"
      class="child"
    >
      <template v-slot:content>
        <p v-dompurify-html="topic.content" />
      </template>
    </Topic>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Topic from './Topic'

export default {
  components: {
    Topic
  },

  computed: {
    ...mapGetters({
      topics: 'topic/getChildrenTopics',
      childrenLength: 'topic/getChildrenTopicsLength'
    })
  }
}
</script>
