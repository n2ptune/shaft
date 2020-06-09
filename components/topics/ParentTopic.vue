<template>
  <div class="topic-wrap parent">
    <div v-dompurify-html="content" />
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
}
</script>
