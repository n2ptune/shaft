<template>
  <main>
    All Users
  </main>
</template>

<script>
export default {
  async asyncData({ $axios, query }) {
    const page = !query.p ? 1 : query.p

    try {
      // eslint-disable-next-line
      const { data } = await $axios.get('/api/users?p=' + page)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
