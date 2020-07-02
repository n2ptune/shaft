<template>
  <section>
    <ul class="flex flex-wrap justify-center">
      <li v-for="user in users" :key="user.userID">
        <ViewUserInfo :user="user" />
      </li>
    </ul>
  </section>
</template>

<script>
import ViewUserInfo from '@/components/layouts/user/ViewUserInfo'

export default {
  components: {
    ViewUserInfo
  },

  props: {
    users: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
ul li {
  flex-basis: 45%;

  @apply mb-12 mr-4;
}

@screen lg {
  ul li {
    flex-basis: 30%;

    @apply mr-0;
  }
}
</style>
