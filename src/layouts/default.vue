<template>
  <div class="relative">
    <Header />
    <nuxt class="mt-6 mb-12 container mx-auto px-4 lg:px-8" />
    <footer class="flex justify-center items-center p-4">
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
