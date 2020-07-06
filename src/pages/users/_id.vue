<template>
  <main class="container mx-auto mb-12">
    <ProfileHeader
      :avatar="user.avatar"
      :nickname="user.nickname"
      :email="user.email"
      :intro="user.introduce"
      :created-at="user.createdAt"
    />
    <ProfileMiddle
      :count="{
        topic: user.topicsCount,
        comment: user.commentsCount,
        like: user.likesCount
      }"
    />
    <ProfileBody />
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
