<template>
  <div class="relative">
    <Header />
    <nuxt />
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
