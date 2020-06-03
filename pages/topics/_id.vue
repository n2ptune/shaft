<template>
  <div>
    {{ topic }}
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      const { data: topic } = await $axios.get('/api/topics/' + params.id)

      return {
        topic
      }
    } catch (error) {
      if (error.toJSON) {
        console.log(error.toJSON())
      }
    }
  }
}
</script>
