<template>
  <main class="mb-12">
    <ViewHeader />
    <ViewUserContainer :users="users" />
    <PageContainer
      :current-page="page.currentPage"
      :pages="page.pages"
      :move-route="{ path: 'users', queryName: 'p' }"
    />
  </main>
</template>

<script>
import ViewHeader from '@/components/layouts/user/ViewHeader'
import ViewUserContainer from '@/components/layouts/user/ViewUserContainer'
import PageContainer from '@/components/utils/PageContainer'

async function fetchUsers(axios, page) {
  const { data } = await axios.get('/api/users?p=' + page)

  return data
}

export default {
  components: {
    ViewHeader,
    ViewUserContainer,
    PageContainer
  },

  async asyncData({ $axios, query, error }) {
    const page = !query.p ? 1 : query.p

    try {
      const data = await fetchUsers($axios, page)

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
  },

  watch: {
    async $route(to, from) {
      const data = await fetchUsers(this.$axios, to.query.p)

      this.users = data.users.data
      this.fetchCount = data.users.count
      this.page = {
        userCount: data.userCount,
        currentPage: data.currentPage,
        pages: data.pages
      }
    }
  }
}
</script>
