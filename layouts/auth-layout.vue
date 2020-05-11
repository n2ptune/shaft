<template>
  <div class="h-screen flex justify-center items-center wrapper">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>

<style lang="postcss" scoped>
.wrapper {
  background: linear-gradient(360deg, #242424, #111114);
}
</style>
