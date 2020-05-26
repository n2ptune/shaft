<template>
  <main class="container mx-auto">
    <ClientOnly>
      <EditorWrapper />
    </ClientOnly>
  </main>
</template>

<script>
import EditorWrapper from '@/components/topics/EditorWrapper'

export default {
  components: {
    EditorWrapper
  }
}
</script>
