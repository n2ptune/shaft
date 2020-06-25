<template>
  <div class="relative">
    <Header />
    <nuxt class="mt-6 container mx-auto px-4 lg:px-8" />
    <footer
      class="flex justify-center items-center px-4 py-12 bg-gray-900 text-white"
    >
      <div class="font-bold text-xl">Footer</div>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/layouts/default/Header'

export default {
  components: {
    Header
  }
}
</script>
