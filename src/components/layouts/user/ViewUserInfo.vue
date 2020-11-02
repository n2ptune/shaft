<template>
  <nuxt-link :to="`/users/${user.userID}`">
    <section>
      <div class="flex">
        <Avatar
          :size="50"
          :alt="user.userNickname"
          :src="user.userAvatar"
          :custom-style="{ alignSelf: 'center', marginRight: '5px' }"
        />
        <div class="ml-2 py-1 text-sm self-start">
          <ul>
            <li class="text-base font-bold">
              {{ user.userNickname }}
            </li>
            <li class="text-gray-500 mb-1">
              {{ user.userEmail }}
            </li>
            <li class="badge">
              <div v-tippy content="작성한 토픽 수">
                {{ user.topicsCount }}
              </div>
              <div v-tippy content="작성한 댓글 수">
                {{ user.commentsCount }}
              </div>
              <div v-tippy content="받은 좋아요 수">
                {{ user.likesCount }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </nuxt-link>
</template>

<script>
import Avatar from '@/components/user/Avatar'

export default {
  components: {
    Avatar
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.badge {
  --default-badge-size: 7px;
  @apply flex;

  & > div {
    @apply pl-1;
    margin-right: 0.3rem;

    &::before {
      @apply align-middle rounded-full relative mr-1;
      bottom: 1.5px;
      content: '';
      display: inline-block;
      width: var(--default-badge-size);
      height: var(--default-badge-size);
    }

    &:first-child::before {
      background-color: theme('colors.badge-topic');
    }

    &:nth-child(2)::before {
      background-color: theme('colors.badge-comment');
    }

    &:last-child::before {
      background-color: theme('colors.badge-like');
    }
  }
}
</style>
