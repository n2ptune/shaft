<template>
  <main>
    <div>Main</div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const offset = 0

    try {
      const { data } = await $axios.get('/api/topics', {
        params: {
          offset
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
