<template>
  <section class="flex my-1">
    <!-- 아바타 -->
    <article>
      <nuxt-link :to="`/users/${item.commentOwnerID}`">
        <UserAvatar :src="item.userAvatar" :alt="item.userNickname" />
      </nuxt-link>
    </article>
    <!-- 내용 -->
    <article class="mx-2">
      {{ item.commentContent }}
    </article>
    <article class="ml-3 text-gray-500 text-sm font-light self-center">
      {{ convertedDate }}
      <span class="mx-1">
        ―
      </span>
      <span class="font-normal text-gray-700">
        {{ item.userNickname }}
      </span>
    </article>
  </section>
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
  },

  computed: {
    convertedDate() {
      return this.$dayjs(this.item.createdAt).format('YYYY년 M월 D일 HH시 m분')
    }
  }
}
</script>
