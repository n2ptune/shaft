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
      <div v-dompurify-html="parentTopic.content" />
    </template>
  </Topic>
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
      parentTopic: 'topic/getParentTopic'
    })
  }

  // props: {
  //   user: {
  //     type: Object,
  //     required: true
  //   },
  //   content: {
  //     type: String,
  //     required: true
  //   },
  //   topic: {
  //     type: Object,
  //     required: true
  //   }
  // }
}
</script>

<style lang="postcss" scoped></style>
