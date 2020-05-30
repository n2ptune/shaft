<template>
  <quill-editor
    :ref="refBind"
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
      console.log(html, text)
    }
  }
}
</script>

<style lang="postcss">
@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.snow.css';
@import '@/assets/css/quill/custom.css';
</style>
