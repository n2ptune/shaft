<template>
  <article class="flex">
    <!-- 아바타 -->
    <div class="mr-2">
      <nuxt-link :to="`/users/${item.commentOwnerID}`">
        <UserAvatar :src="item.userAvatar" :alt="item.userNickname" />
      </nuxt-link>
    </div>
    <!-- 내용 -->
    <div>
      {{ item.commentContent }}
    </div>
  </article>
</template>

<script>
import UserAvatar from '@/components/user/Avatar'

export default {
  components: {
    UserAvatar
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
