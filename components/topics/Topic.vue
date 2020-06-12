<template>
  <div class="topic-wrap">
    <div class="my-2">
      <div class="user-info">
        <div>
          <nuxt-link :to="`/users/${ownerId}`">
            <UserAvatar :src="avatar" :alt="nickname" size="xl" />
          </nuxt-link>
        </div>
        <div>
          <div class="font-bold">
            {{ nickname }}
            <span class="font-normal text-gray-600">({{ email }})</span>
          </div>
          <div class="flex items-center">
            <div>
              <fa
                :icon="['far', 'thumbs-up']"
                class="cursor-pointer text-gray-600 hover:text-black"
              />
              <span>
                {{ likeCount }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="topic-content-wrap">
        <slot name="content" />
      </div>
      <ClientOnly>
        <Comments :comments="comments" />
      </ClientOnly>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserAvatar from '@/components/user/Avatar'
import Comments from '@/components/topics/Comments'

export default {
  components: {
    UserAvatar,
    Comments
  },

  props: {
    avatar: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    ownerId: {
      type: Number,
      required: true
    },
    topicId: {
      type: Number,
      required: true
    },
    likeCount: {
      type: Number,
      required: true
    },
    comments: {
      type: Array,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      isLogin: 'auth/getIsLogin'
    })
  },

  methods: {
    writeComment() {},
    cancelComment() {}
  }
}
</script>

<style lang="postcss" scoped>
.user-info {
  @apply flex items-center mb-4;
}

.user-info > :last-child {
  @apply ml-4;
}
</style>
