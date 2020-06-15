<template>
  <section class="flex my-3">
    <!-- 아바타 -->
    <article class="flex-shrink-0 self-start">
      <nuxt-link :to="`/users/${item.commentOwnerID}`">
        <UserAvatar :src="item.userAvatar" :alt="item.userNickname" />
      </nuxt-link>
    </article>
    <!-- 내용 -->
    <section class="ml-2">
      <header class="font-bold">
        <nuxt-link :to="`/users/${item.commentOwnerID}`">
          {{ item.userNickname }}
        </nuxt-link>
        <span class="text-gray-600 font-light ml-1">{{ convertedDate }}</span>
        <span v-if="item.commentOwnerID === userID" class="ml-1">
          TODO) UPDATE, DELETE 등
        </span>
      </header>
      <article class="mt-1 text-sm">
        <p>{{ item.commentContent }}</p>
      </article>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters({
      userID: 'auth/getUserID'
    }),
    convertedDate() {
      return this.$dayjs(this.item.createdAt).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>
