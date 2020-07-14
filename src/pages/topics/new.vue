<template>
  <main class="container mx-auto mb-12">
    <ClientOnly>
      <EditorWrapper />
    </ClientOnly>
  </main>
</template>

<script>
import EditorWrapper from '@/components/topics/editor/EditorWrapper.vue'

export default {
  components: {
    EditorWrapper
  },

  async asyncData({ $axios, query }) {
    if (query.id) {
      const { data } = await $axios.get('/api/topics/update/' + query.id)

      return {
        topic: data
      }
    }
  }
}
</script>
