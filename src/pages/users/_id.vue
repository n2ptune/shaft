<template>
  <main class="container mx-auto relative">
    <div class="text-center">
      !!
    </div>
  </main>
</template>

<script>
export default {
  layout: 'user',

  async created() {
    const { id } = this.$route.params
    await this.$store.dispatch('view/user/fetchViewUser', id)
  }
}
</script>

<style lang="postcss" scoped>
main {
  top: 3.5rem;
}
</style>
