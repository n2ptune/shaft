<template>
  <Avatar
    :username="alt"
    :background-color="src"
    :size="size"
    :custom-style="customStyle"
  />
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  components: {
    Avatar
  },

  props: {
    src: {
      type: String,
      required: false,
      default: null
    },
    alt: {
      type: String,
      required: false,
      default: null
    },
    size: {
      type: Number,
      required: false,
      default: 50
    },
    customStyle: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
