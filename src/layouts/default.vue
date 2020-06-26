<template>
  <div class="relative">
    <Header />
    <section class="default-layout-main-container container">
      <aside class="left-aside-container">
        <div class="left-aside-inner">
          <LeftSidebar />
        </div>
      </aside>
      <section class="w-full">
        <!-- <nuxt class="mt-6 mx-auto px-4 lg:px-8" /> -->
        <nuxt class="mt-8 px-4 lg:px-8" />
      </section>
    </section>
    <footer
      class="flex justify-center items-center px-4 py-12 bg-gray-900 text-white"
    >
      <div class="font-bold text-xl">Footer</div>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/layouts/default/Header'
import LeftSidebar from '@/components/layouts/topic/LeftSidebar'

export default {
  components: {
    Header,
    LeftSidebar
  }
}
</script>

<style lang="postcss" scoped>
/* 기본 Breakpoints (모바일) */
.default-layout-main-container {
  @apply mx-auto flex;
  word-break: break-all;

  & .left-aside-container {
    @apply hidden;
  }
}

@screen md {
  .default-layout-main-container {
    & .left-aside-container {
      @apply block border-r border-gray-300 mr-8;
      width: 120px;

      & .left-aside-inner {
        @apply text-sm sticky pt-8;
        top: 50px;
      }
    }
  }
}
</style>
