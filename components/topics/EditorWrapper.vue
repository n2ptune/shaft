<template>
  <div class="wrapper mx-4 lg:mx-6">
    <Block title="토픽 제목">
      <input
        v-model="topic.title"
        type="text"
        placeholder="토픽 제목을 입력하세요."
        class="input-reset"
      />
    </Block>
    <div class="flex flex-col lg:flex-row head mb-12">
      <Block title="카테고리(단일 지정)" class="separate">
        <CategoryList :category="category.origin" />
      </Block>
      <Block title="서브 카테고리(복수 지정)" class="separate">
        <CategoryList :category="category.sub" :multiselect="true" />
      </Block>
    </div>
    <Block title="토픽 내용">
      <quill-editor
        ref="myQuillEditor"
        v-model="topic.content"
        :options="editorOption"
        class="w-full"
      />
    </Block>
  </div>
</template>

<script>
import Block from './EditorBlock'
import CategoryList from './CategoryList'

export default {
  components: {
    Block,
    CategoryList
  },

  data: () => ({
    topic: {
      title: '',
      content: ''
    },
    editorOption: {
      theme: 'bubble',
      placeholder: '토픽 내용을 작성하세요!'
    },
    category: {
      origin: null,
      sub: null
    }
  }),

  computed: {
    editor() {
      return this.$refs.myQuillEditor ? this.$refs.myQuillEditor.quill : null
    }
  },

  async created() {
    try {
      const { data } = await this.$axios.get('/api/topics/category')

      data.category.forEach((item) => (item.selected = false))
      data.sub.forEach((item) => (item.selected = false))

      this.category.origin = data.category
      this.category.sub = data.sub
    } catch (error) {
      // console.error(error)
    }
  },

  mounted() {
    // console.log('this is current quill instance object', this.editor)
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

.input-reset {
  @apply w-full py-2;
}

.input-reset:focus {
  @apply outline-none border-b-2 border-orange-300;
}

.wrapper {
  width: 56rem;
  max-width: 56rem;
}

.head .separate {
  flex-basis: 50%;
}

.head .separate:first-child {
  @apply mr-4;
}

.ql-editor.ql-blank::before {
  font-style: normal !important;
  @apply text-gray-500 text-lg font-bold !important;
}
</style>
