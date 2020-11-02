<template>
  <section>
    <ul>
      <li v-for="user in users" :key="user.userID">
        <ViewUserInfo :user="user" />
      </li>
    </ul>
  </section>
</template>

<script>
import ViewUserInfo from '@/components/layouts/user/ViewUserInfo.vue'

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
ul {
  @apply flex flex-wrap justify-center;
}

ul li {
  flex-basis: 45%;

  @apply mb-12 mr-4;
}

@screen lg {
  ul {
    @apply justify-start;
  }

  ul li {
    flex-basis: 30%;

    @apply mr-0;
  }
}
</style>
