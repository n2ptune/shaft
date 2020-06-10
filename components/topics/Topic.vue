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
            <!-- <div class="mx-2">Test</div> -->
          </div>
        </div>
      </div>
      <div class="topic-content-wrap">
        <slot name="content" />
      </div>
      <ClientOnly>
        <div class="comments-wrap mb-6 mt-10">
          <div class="comments-input flex items-center relative">
            <UserAvatar
              class="self-start"
              :src="userAvatar"
              :alt="userNickname"
            />
            <textarea
              type="text"
              rows="3"
              :style="{ resize: 'none' }"
              :disabled="!isLogin"
              :placeholder="
                isLogin ? '댓글을 입력하세요.' : '로그인이 필요한 서비스입니다.'
              "
              class="w-full rounded-lg border border-gray-400 focus:outline-none text-sm py-1 px-2 ml-2"
            />
          </div>
          <div class="comments-btn-wrap">
            <button @click="writeComment">
              등록
            </button>
            <button @click="cancelComment">
              취소
            </button>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    },
    topicId: {
      type: Number,
      required: true
    },
    likeCount: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      isLogin: 'auth/getIsLogin',
      userAvatar: 'auth/getUserAvatar',
      userNickname: 'auth/getUserNickname',
      userID: 'auth/getUserID'
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

.comments-btn-wrap {
  @apply flex justify-end mt-2;

  & button {
    @apply text-sm py-2 px-6 rounded-lg transition-colors duration-300;

    &:first-of-type {
      @apply bg-orange-500 text-white mr-2;

      &:hover {
        @apply bg-orange-600;
      }
    }

    &:last-of-type {
      @apply bg-gray-200;

      &:hover {
        @apply bg-gray-300;
      }
    }
  }
}
</style>
