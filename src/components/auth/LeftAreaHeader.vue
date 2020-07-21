<template>
  <div class="flex items-center justify-center h-full relative">
    <div class="text-white">
      <h1 class="text-3xl font-bold">SHAFT</h1>
      <p class="leading-3 font-light">
        Community For Developers
      </p>
      <div class="mt-4">
        <p class="mb-4">
          {{ nameWithRoute }}
        </p>
        <nuxt-link
          :to="pathWithRoute"
          class="px-4 py-1 border-2 border-white rounded-full text-sm transition-colors duration-200 hover:text-black hover:bg-white shadow-xl"
        >
          {{ isRouteSignIn ? 'SIGN-UP' : 'SIGN-IN' }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isRouteSignIn() {
      return this.$route.path.includes('sign-in')
    },
    nameWithRoute() {
      return this.isRouteSignIn
        ? '아직 회원이 아니신가요?'
        : '이미 회원이십니까?'
    },
    pathWithRoute() {
      return this.isRouteSignIn ? '/auth/sign-up' : '/auth/sign-in'
    }
  }
}
</script>
