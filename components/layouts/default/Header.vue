<template>
  <header class="p-4 border-b border-gray-300">
    <div class="max-w-xl mx-auto flex justify-between items-center">
      <div class="font-bold text-xl">Header</div>
      <div>
        <ClientOnly>
          <div
            v-if="isAuth && user"
            class="auth"
            @mouseover="isDropdown = true"
            @mouseleave="isDropdown = false"
          >
            <img
              :src="user.avatar"
              :style="{ width: '40px' }"
              class="rounded-full"
            />
            <AvatarDropdown v-if="isDropdown" />
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
import AvatarDropdown from '@/components/dropdown/AvatarDropdown'

export default {
  components: {
    AvatarDropdown
  },

  data: () => ({
    isDropdown: false
  }),

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
