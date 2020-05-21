<template>
  <header class="p-4 border-b border-gray-300">
    <div class="max-w-xl mx-auto flex justify-between items-center">
      <div class="font-bold text-xl">Header</div>
      <div class="mx-6">
        <ClientOnly>
          <div v-if="isAuth && user" class="auth">
            <nuxt-link :to="`/users/${user.id}`">
              <img
                :src="user.avatar"
                :style="{ width: '40px' }"
                class="rounded-full"
              />
            </nuxt-link>
            <div class="">
              <button @click="logout">!!!</button>
            </div>
          </div>
          <div v-else class="auth">
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
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isAuth: 'auth/getIsLogin',
      user: 'auth/getUser'
    })
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  }
}
</script>

<style lang="postcss" scoped>
.auth {
  @apply flex items-center;
}
.auth > * {
  @apply mx-2;
}
</style>
