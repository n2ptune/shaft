<template>
  <section class="comments-wrap">
    <div class="comments-input flex items-center relative">
      <UserAvatar class="self-start" />
      <textarea
        v-model="inputComment"
        type="text"
        rows="3"
        :style="{ resize: 'none' }"
        :disabled="!isLogin"
        :placeholder="
          isLogin
            ? '댓글을 입력하세요. (5자 이상)'
            : '로그인이 필요한 서비스입니다.'
        "
        :class="isErrorInputComment ? 'on-error' : ''"
        @input="onInputComment"
      />
    </div>
    <section class="comments-btn-wrap">
      <button :disabled="disabledWriteButton" @click="writeComment">
        등록
      </button>
      <button @click="cancelComment">
        취소
      </button>
    </section>
    <section v-if="comments.length" class="flex flex-col">
      <div class="text-gray-600 mb-4">{{ comments.length }}개의 댓글</div>
      <CommentListItem
        v-for="comment in comments"
        :key="comment.commentID"
        :item="comment"
      />
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import UserAvatar from '@/components/user/Avatar'
import CommentListItem from '@/components/topics/comments/ListItem'

export default {
  components: {
    UserAvatar,
    CommentListItem
  },

  props: {
    comments: {
      type: Array,
      required: true
    },
    topicId: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    inputComment: '',
    disabledWriteButton: true,
    isErrorInputComment: false
  }),

  computed: {
    ...mapGetters({
      isLogin: 'auth/getIsLogin',
      userID: 'auth/getUserID'
    })
  },

  methods: {
    async writeComment() {
      // 입력 값이 없거나 5자가 넘지 않을 경우
      // isErrorInputComment 값 트리거
      if (!this.inputComment || this.inputComment.length < 5) {
        this.isErrorInputComment = true
        return
      }

      try {
        // 값을 변수에 할당하고 컴포넌트의 데이터 초기화
        const _inputComment = this.inputComment
        this.inputComment = ''

        await this.$store.dispatch('topic/writeComment', {
          comment: _inputComment,
          topicID: this.topicId,
          date: this.$convertDate(new Date())
        })

        // 댓글 새로고침
        // this.$emit('refreshComment', refreshCommentsData)
      } catch (error) {
        // 에러 발생시 댓글 입력창 하이라이트
        this.isErrorInputComment = true
      }
    },
    cancelComment() {},
    onInputComment() {
      this.disabledWriteButton = !this.inputComment

      // isErrorInputComment 값이 트리거 됬고,
      // 댓글이 유효하다면 값을 다시 트리거
      if (
        this.isErrorInputComment &&
        this.inputComment &&
        this.inputComment.length > 5
      ) {
        this.isErrorInputComment = false
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
textarea {
  @apply w-full rounded-lg border border-gray-400 text-sm py-1 px-2 ml-2
  transition-colors duration-500;

  &:focus {
    @apply outline-none;
  }

  &.on-error {
    @apply border-red-500;
  }
}

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

        &:disabled {
          @apply bg-orange-300;
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
