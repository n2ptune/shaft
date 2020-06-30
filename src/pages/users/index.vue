<template>
  <main>
    <!-- TODO: User View Component!! -->
    <!-- TODO: User View Page Component!! -->
  </main>
</template>

<script>
export default {
  async asyncData({ $axios, query, error }) {
    const page = !query.p ? 1 : query.p

    try {
      const { data } = await $axios.get('/api/users?p=' + page)

      return {
        users: data.users.data,
        fetchCount: data.users.count,
        page: {
          usersCount: data.userCount,
          currentPage: data.currentPage,
          pages: data.pages
        }
      }
    } catch (fetchError) {
      error(fetchError)
    }
  }
}
</script>
