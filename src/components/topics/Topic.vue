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
                @click="likeTopic"
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
import UserAvatar from '@/components/user/Avatar'
import CommentsContainer from '@/components/topics/comments/Container'

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
      isLogin: 'auth/getIsLogin'
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
      // likeInfo
      // topicID, isCanceled, likeCount
      try {
        const { data: likeInfo } = await this.$axios.put('/api/topics/like', {
          topicID: this.topicId
        })

        this.$store.commit('topic/updateLikeCount', likeInfo)
      } catch (error) {
        console.log(error)
      }
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
