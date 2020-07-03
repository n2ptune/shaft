<template>
  <ul>
    <li class="text-xs mb-2">
      목록
    </li>
    <li v-for="route in routes" :key="route.name">
      <nuxt-link
        :to="{ path: route.path, query: { [route.queryName]: 1 } }"
        active-class="router-active"
        exact-active-class="router-exact-active"
      >
        <fa v-if="route.icon" :icon="route.icon" class="mr-1" />
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
          path: '/',
          queryName: 'o',
          icon: ['fas', 'home']
        },
        {
          name: 'Users',
          path: '/users',
          queryName: 'p',
          icon: ['fas', 'user']
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

      &.router-active {
        @apply font-bold;

        background-color: rgba(0, 0, 0, 0.05);
        border-right-width: 3px;
        border-right-color: theme('colors.orange.500');
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>
