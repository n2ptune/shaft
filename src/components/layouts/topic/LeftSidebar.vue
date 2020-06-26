<template>
  <ul>
    <li v-for="route in routes" :key="route.name">
      <nuxt-link
        :to="route.path"
        active-class="router-active"
        exact-active-class="router-exact-active"
      >
        {{ route.name }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    routes() {
      return [
        {
          name: 'Home',
          path: '/'
        },
        {
          name: 'Users',
          path: '/users'
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
ul {
  @apply text-sm;

  & li {
    & a {
      @apply block px-1 py-2;

      &.router-exact-active {
        @apply bg-gray-200 font-bold;

        border-right-width: 3px;
        border-right-color: theme('colors.orange.500');
      }
    }
  }
}
</style>
