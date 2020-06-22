<template>
  <header class="w-full h-24 bg-blue-600 relative">
    <img
      :src="avatar"
      :class="!avatar ? 'bg-gray-900' : ''"
      class="avatar relative rounded-full border-4 border-white w-20 h-20 mx-auto bg-white"
    />
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      avatar: 'view/user/getViewUserAvatar'
    })
  }
}
</script>

<style lang="postcss" scoped>
.avatar {
  transform: translateY(65%);
}
</style>
