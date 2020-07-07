<template>
  <main class="container mx-auto mb-12">
    <ProfileHeader
      :avatar="user.profile.avatar"
      :nickname="user.profile.nickname"
      :email="user.profile.email"
      :intro="user.profile.introduce"
      :created-at="user.profile.createdAt"
    />
    <ProfileMiddle
      :count="{
        topic: user.profile.topicsCount,
        comment: user.profile.commentsCount,
        like: user.profile.likesCount
      }"
    />
    <ProfileBody :topics="user.topics" :tags="user.tags" />
  </main>
</template>

<script>
import ProfileHeader from '@/components/user/ProfileHeader.vue'
import ProfileMiddle from '@/components/user/ProfileMiddle.vue'
import ProfileBody from '@/components/user/ProfileBody.vue'

export default {
  components: {
    ProfileHeader,
    ProfileMiddle,
    ProfileBody
  },

  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.get(`/api/users/${params.id}`)

      return {
        user: data
      }
    } catch (fetchError) {
      error(fetchError)
    }
  }
}
</script>

<style lang="postcss" scoped>
main {
  top: 3.5rem;
}
</style>
