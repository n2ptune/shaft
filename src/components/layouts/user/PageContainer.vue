<template>
  <section class="mt-6">
    <ul>
      <nuxt-link
        v-for="page in allPages"
        :key="page.route"
        :to="{ path: 'users', query: { p: page.value } }"
        exact-active-class="page-router-exact-active"
        tag="li"
      >
        {{ page.value }}
      </nuxt-link>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pages: {
      type: Number,
      required: true
    }
  },

  computed: {
    allPages() {
      const pages = []

      for (let i = 1; i <= this.pages; i++) {
        pages.push({
          value: i
        })
      }

      return pages
    }
  }
}
</script>

<style lang="postcss" scoped>
ul {
  @apply flex justify-center;

  & li {
    @apply py-1 px-3 cursor-pointer mr-2 mb-2 rounded-lg border border-gray-400;

    &.page-router-exact-active {
      @apply bg-orange-500 text-white border-transparent;
    }

    &:not(.page-router-exact-active):hover {
      @apply border-transparent;

      background-color: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
