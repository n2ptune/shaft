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
          <div>
            Test
          </div>
        </div>
      </div>
      <div class="topic-content-wrap">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from '@/components/user/Avatar'

export default {
  components: {
    UserAvatar
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
    }
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
