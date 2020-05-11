<template>
  <header class="p-4 border-b border-gray-300">
    <div class="max-w-xl mx-auto flex justify-between items-center">
      <div class="font-bold text-xl">Header</div>
      <div class="mx-6">
        <ClientOnly>
          <div v-if="isAuth && user">
            <img
              :src="user.avatar"
              :style="{ width: '40px' }"
              class="rounded-full"
            />
          </div>
          <div v-else class="not-auth">
            <nuxt-link to="/auth/sign-in">
              SIGN IN
            </nuxt-link>
            <nuxt-link to="/auth/sign-up">
              SIGN UP
            </nuxt-link>
          </div>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isAuth: 'auth/getIsLogin',
      user: 'auth/getUser'
    })
  }
}
</script>

<style lang="postcss" scoped>
.not-auth > a {
  @apply mx-1;
}
</style>
