<template>
  <main
    class="h-screen flex items-center justify-center bg-gray-300 overflow-y-auto"
  >
    <nuxt />
    <footer
      class="absolute hidden lg:block bottom-0 mb-2 text-sm text-gray-600"
    >
      2020 Shaft.
    </footer>
  </main>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>

<style lang="postcss" scoped></style>
