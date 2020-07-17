<template>
  <quill-editor
    :ref="refBind"
    :content="content"
    :options="options"
    @ready="onEditorReady($event)"
    @change="onEditorChange($event)"
  />
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: false,
      default: () => {}
    },
    refBind: {
      type: String,
      required: false,
      default: 'quillEditor'
    },
    content: {
      type: String,
      required: false,
      default: ''
    }
  },

  computed: {
    editor() {
      return this.$refs[this.refBind] ? this.$refs[this.refBind].quill : null
    }
  },

  methods: {
    onEditorReady($event) {
      this.$emit('ready', this.editor)
    },
    onEditorChange({ html, text }) {
      this.$emit('input', { html, text })
    }
  }
}
</script>

<style lang="postcss">
@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.snow.css';
@import '@/assets/css/quill/custom.css';

.ql-container {
  font-size: 16px;
}

/* TODO: Quill Editor Style */
</style>
