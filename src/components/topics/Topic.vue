<template>
  <div :id="topicId" class="topic-wrap">
    <div class="my-2">
      <div class="user-info">
        <section>
          <article class="inline-block mr-2 align-top">
            <nuxt-link :to="`/users/${ownerId}`">
              <UserAvatar :src="avatar" :alt="nickname" />
            </nuxt-link>
          </article>
          <article class="inline-block">
            <div class="font-bold">
              {{ nickname }}
              <span class="font-normal text-gray-600">({{ email }})</span>
            </div>
            <div class="flex items-center">
              <div>
                <fa
                  :icon="['far', 'thumbs-up']"
                  class="cursor-pointer text-gray-600 hover:text-black"
                  @click="likeTopic"
                />
                <span>
                  {{ likeCount }}
                </span>
              </div>
            </div>
          </article>
        </section>
        <section v-if="userID === ownerId" class="pr-2 edit-container">
          <button class="mr-2" @click="deleteTopic">
            <fa :icon="['fas', 'trash-alt']" class="text-gray-600" />
          </button>
          <button @click="editTopic">
            <fa :icon="['fas', 'edit']" class="text-gray-600" />
          </button>
        </section>
      </div>
      <div class="topic-content-wrap">
        <slot name="content" />
      </div>
      <ClientOnly>
        <CommentsContainer
          :comments="pagingComments"
          :topic-id="topicId"
          :origin-length="comments.length"
        />
        <footer
          v-if="!isCommentOffset && isCommentOverFive"
          class="inline-block"
        >
          <p class="underline cursor-pointer" @click="loadMoreComment">
            댓글 {{ lengthOfComments }}개 더보기
          </p>
        </footer>
      </ClientOnly>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserAvatar from '@/components/user/Avatar.vue'
import CommentsContainer from '@/components/topics/comments/Container.vue'

export default {
  components: {
    UserAvatar,
    CommentsContainer
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
    parent: {
      type: Number,
      required: false,
      default: null
    },
    comments: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    isCommentOffset: false
  }),

  computed: {
    ...mapGetters({
      isLogin: 'auth/getIsLogin',
      userID: 'auth/getUserID'
    }),
    isCommentOverFive() {
      return this.comments.length > 5
    },
    lengthOfComments() {
      if (this.isCommentOverFive) {
        return this.comments.length - 5
      } else {
        return this.comments.length
      }
    },
    pagingComments() {
      if (this.comments.length < 5) {
        // 댓글의 총 길이가 5개 미만이라면 전체 보여주기
        return this.comments
      } else if (!this.isCommentOffset) {
        // 댓글의 총 길이가 5개 이상이고 오프셋 데이터가 false라면
        // 5개만 보여주기
        return this.comments.slice(0, 5)
      } else {
        // 댓글의 총 길이가 5개 이상이고 오프셋 데이터가 true면
        // 전체 보여주기
        return this.comments
      }
    }
  },

  methods: {
    loadMoreComment() {
      if (this.isCommentOffset) {
        return
      }

      this.isCommentOffset = true
    },
    async likeTopic() {
      try {
        const { data: likeInfo } = await this.$axios.put('/api/topics/like', {
          topicID: this.topicId
        })

        this.$store.commit('topic/updateLikeCount', likeInfo)
      } catch (error) {}
    },
    deleteTopic() {
      this.$confirm.on({
        isEditor: false,
        title: '토픽 삭제',
        body: '토픽을 삭제하시겠습니까?',
        onSubmit: async () => {
          try {
            await this.$axios.delete(`/api/topics/${this.topicId}`)

            this.$confirm.close()

            if (this.parent) {
              // 자식 토픽일 경우
              await this.$store.commit('topic/deleteTopic', {
                topicID: this.topicId
              })
            } else {
              // 부모 토픽일 경우 메인 페이지로 이동
              this.$router.push('/')
            }
          } catch (error) {
            // 실패 처리
            // console.error(error)
          }
        },
        onCancel: () => this.$confirm.close()
      })
    },
    editTopic() {
      this.$router.push({
        path: '/topics/new',
        query: {
          id: this.topicId
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.user-info {
  @apply flex items-start justify-between mb-4;
}

.user-info > :last-child {
  @apply ml-4;
}

.edit-container {
  & button >>> svg {
    @apply text-gray-600 transition-colors duration-200;

    &:hover {
      @apply text-black;
    }
  }
}
</style>
