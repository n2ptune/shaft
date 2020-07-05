<template>
  <main class="container mx-auto relative">
    <div class="text-center">
      !!
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.get(`/api/users/${params.id}`)

      console.log(data)
    } catch (fetchError) {
      error(fetchError)
    }
  }
}
</script>

<style lang="postcss" scoped>
main {
  top: 3.5rem;
}
</style>
