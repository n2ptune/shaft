<template>
  <div class="wrapper mx-4 lg:mx-6">
    <div class="flex head mb-6">
      <div class="block p-2 lg:p-6">
        1 block
      </div>
      <div class="block p-2 lg:p-6">
        2 block
      </div>
    </div>
    <div class="block p-2 lg:p-6">
      <quill-editor
        ref="myQuillEditor"
        v-model="content"
        :options="editorOption"
        class="w-full"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    content: '',
    editorOption: {
      theme: 'bubble',
      placeholder: '토픽 내용을 작성하세요!'
    }
  }),

  computed: {
    editor() {
      return this.$refs.myQuillEditor ? this.$refs.myQuillEditor.quill : null
    }
  },

  mounted() {
    console.log('this is current quill instance object', this.editor)
  }

  // methods: {
  //   onEditorBlur(quill) {
  //     console.log('editor blur!', quill)
  //   },
  //   onEditorFocus(quill) {
  //     console.log('editor focus!', quill)
  //   },
  //   onEditorReady(quill) {
  //     console.log('editor ready!', quill)
  //   },
  //   onEditorChange({ quill, html, text }) {
  //     console.log('editor change!', quill, html, text)
  //     this.content = html
  //   }
  // }
}
</script>

<style lang="postcss">
@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.bubble.css';

.wrapper {
  width: 56rem;
  max-width: 56rem;
}

.block {
  @apply border border-gray-300 rounded-lg;
}

.head > .block {
  flex-basis: 50%;
}

.head > .block:first-child {
  @apply mr-4;
}

.ql-editor.ql-blank::before {
  font-style: normal !important;
  @apply text-gray-500 text-lg font-bold !important;
}
</style>
