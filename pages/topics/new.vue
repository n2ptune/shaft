<template>
  <main>
    <ClientOnly>
      <div class="mx-2 md:mx-6">
        <quill-editor
          ref="myQuillEditor"
          v-model="content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        />
      </div>
    </ClientOnly>
  </main>
</template>

<script>
export default {
  data: () => ({
    content: '<h2>EXAMPLE</h2>',
    editorOption: {}
  }),

  computed: {
    editor() {
      return this.$refs.myQuillEditor ? this.$refs.myQuillEditor.quill : null
    }
  },

  mounted() {
    console.log('this is current quill instance object', this.editor)
  },

  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  }
}
</script>
