<template>
  <div class="relative">
    <UserHeader />
    <nuxt />
    <footer></footer>
  </div>
</template>

<script>
import UserHeader from '@/components/layouts/user/Header'

export default {
  components: {
    UserHeader
  }
}
</script>
