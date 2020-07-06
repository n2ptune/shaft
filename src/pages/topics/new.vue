<template>
  <main class="container mx-auto mb-12">
    <ClientOnly>
      <EditorWrapper />
    </ClientOnly>
  </main>
</template>

<script>
import EditorWrapper from '@/components/topics/editor/EditorWrapper'

export default {
  components: {
    EditorWrapper
  }
}
</script>
