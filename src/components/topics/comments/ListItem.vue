<template>
  <section class="flex my-3">
    <article class="flex-shrink-0 self-start">
      <nuxt-link :to="`/users/${item.commentOwnerID}`">
        <UserAvatar :src="item.userAvatar" :alt="item.userNickname" />
      </nuxt-link>
    </article>
    <section class="ml-2">
      <header class="font-bold">
        <nuxt-link :to="`/users/${item.commentOwnerID}`">
          {{ item.userNickname }}
        </nuxt-link>
        <span class="text-sm md:text-base text-gray-600 font-light ml-1">{{
          convertedDate
        }}</span>
        <ul v-if="item.commentOwnerID === userID" class="manage-comments">
          <li @click="updateComment">
            수정
          </li>
          <li @click="deleteComment">
            삭제
          </li>
        </ul>
      </header>
      <article class="mt-1 text-sm md:text-base">
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
  },

  methods: {
    updateComment() {
      this.$confirm.on({
        isEditor: true,
        title: '댓글 수정',
        body: this.item.commentContent,
        onSubmit: async (data) => {
          if (data === this.item.commentContent) return

          try {
            await this.$store.dispatch('topic/updateComment', {
              commentID: this.item.commentID,
              updatedComment: data,
              date: this.$convertDate(new Date())
            })

            this.$confirm.close()
          } catch (_error) {
            // 에러 처리
          }
        },
        onCancel: () => {
          this.$confirm.close()
        }
      })
    },
    deleteComment() {
      this.$confirm.on({
        title: '댓글 삭제',
        body: '댓글을 삭제하시겠습니까?',
        isEditor: false,

        onSubmit: async () => {
          if (!this.$store.getters['auth/getIsLogin']) {
            // 로그인 필요
            return
          }

          // 토픽과 댓글 아이디로 Vuex 액션 호출
          await this.$store.dispatch('topic/deleteComment', {
            commentID: this.item.commentID,
            topicID: this.item.targetTopicID
          })

          this.$confirm.close()
        },

        onCancel: () => {
          this.$confirm.close()
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.manage-comments {
  @apply ml-1 inline-block text-sm font-light;

  & li {
    @apply inline cursor-pointer;

    &:not(:first-of-type)::before {
      content: '|';
      @apply mx-1 inline-block text-xs align-top;
    }

    &:hover {
      @apply font-normal;
    }
  }
}
</style>
