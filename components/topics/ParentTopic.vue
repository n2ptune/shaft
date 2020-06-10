<template>
  <Topic
    :avatar="user.avatar"
    :nickname="user.nickname"
    :email="user.email"
    :owner-id="user.id"
    :topic-id="topic.id"
    :like-count="topic.likeCount"
    class="parent"
  >
    <template v-slot:content>
      <div v-dompurify-html="content" />
    </template>
  </Topic>
</template>

<script>
import Topic from './Topic'

export default {
  components: {
    Topic
  },

  props: {
    user: {
      type: Object,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    topic: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped></style>
