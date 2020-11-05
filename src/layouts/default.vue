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
        <nuxt class="mt-8 px-3 lg:px-8" />
      </section>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/layouts/default/Header.vue'
import Footer from '@/components/layouts/default/Footer.vue'
import LeftSidebar from '@/components/layouts/topic/LeftSidebar.vue'

export default {
  components: {
    Header,
    Footer,
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
