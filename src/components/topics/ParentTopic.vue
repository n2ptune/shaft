<template>
  <Topic
    :avatar="parentTopic.ownerAvatar"
    :nickname="parentTopic.ownerNickname"
    :email="parentTopic.ownerEmail"
    :owner-id="parentTopic.ownerID"
    :topic-id="parentTopic.id"
    :like-count="parentTopic.likeCount"
    :comments="parentTopic.comments"
    class="parent"
  >
    <template v-slot:content>
      <div v-dompurify-html="parentTopic.content" class="content" />
    </template>
  </Topic>
</template>

<script>
import { mapGetters } from 'vuex'
import Topic from './Topic.vue'

export default {
  components: {
    Topic
  },

  computed: {
    ...mapGetters({
      parentTopic: 'topic/getParentTopic'
    })
  }
}
</script>
