<template>
  <div class="comments-wrap">
    <div class="comments-input flex items-center relative">
      <UserAvatar class="self-start" />
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
</template>

<script>
import { mapGetters } from 'vuex'
import UserAvatar from '@/components/user/Avatar'

export default {
  components: {
    UserAvatar
  },

  computed: {
    ...mapGetters({
      isLogin: 'auth/getIsLogin',
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
.comments-wrap {
  @apply mt-6 mb-10;

  & .comments-btn-wrap {
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
}
</style>
