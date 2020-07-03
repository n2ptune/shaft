<template>
  <section class="mt-6">
    <ul>
      <li
        v-if="overDistanceFromLeast"
        class="least-page"
        @click="moveRouteLeast"
        v-text="'<<'"
      />
      <nuxt-link
        v-for="page in allPages"
        :key="page"
        :to="{ path: 'users', query: { p: page } }"
        exact-active-class="page-router-exact-active"
        tag="li"
      >
        {{ page }}
      </nuxt-link>
      <li
        v-if="overDistanceFromMax"
        class="max-page"
        @click="moveRouteMax"
        v-text="'>>'"
      />
    </ul>
  </section>
</template>

<script>
// 페이지는 총 5개를 보여줌
// 최소 페이지와 차이가 5이상 나면 최소 페이지 ... [p, p, c, p, p] ... 최대 페이지
// 그 외 [p, c, p, p, p] ... 최대 페이지
// 최대 페이지와 차이가 5이하 나면 최소 페이지 ... [p, p, p, p, c]
const offset = 3

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
      let start = this.currentPage - offset

      if (start <= 1) {
        start = 1
      }

      const arr = Array(5)
        .fill(start)
        .map((data, i) => data + i * 1)

      // 검증
      const overflowArr = arr.filter((data) => data > this.pages)

      if (overflowArr.length) {
        for (let i = 0; i < overflowArr.length; i++) {
          const overflowIndex = arr.findIndex((data) => data > this.pages)
          arr.splice(overflowIndex, 1)
        }
      }

      return arr
    },
    overDistanceFromLeast() {
      return this.currentPage > offset
    },
    overDistanceFromMax() {
      return this.pages - offset > this.currentPage
    }
  },

  methods: {
    moveRouteLeast() {
      this.$router.push({
        path: 'users',
        query: {
          p: 1
        }
      })
    },
    moveRouteMax() {
      this.$router.push({
        path: 'users',
        query: {
          p: this.pages
        }
      })
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
