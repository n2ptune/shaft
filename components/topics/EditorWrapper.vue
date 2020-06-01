<template>
  <div class="wrapper-editor mx-4 lg:mx-6">
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
    <Block title="토픽 내용" class="editor-wrapper">
      <QuillWrapper
        :options="editorOption"
        ref-bind="myQuillEditor"
        class="w-full"
        @ready="onEditorReady"
        @input="onEditorInput"
      />
      <template slot="footer">
        <div class="flex justify-end mt-4">
          <div class="area-button">
            <button
              :disabled="writing"
              class="font-black text-white px-4 py-3 bg-orange-500 rounded-lg transition-colors duration-200 hover:bg-orange-700 disabled:bg-gray-700"
              @click="submitTopic"
            >
              {{ waitingText }}
            </button>
          </div>
        </div>
      </template>
    </Block>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Block from './EditorBlock'
import CategoryList from './CategoryList'
import QuillWrapper from './QuillWrapper'

export default {
  components: {
    Block,
    CategoryList,
    QuillWrapper
  },

  data: () => ({
    topic: {
      title: '',
      content: ''
    },
    editor: null,
    editorOption: {
      theme: 'snow',
      placeholder: '토픽 내용을 작성하세요!',
      modules: {
        toolbar: [
          ['bold', 'code', 'link', 'strike', 'underline'],
          ['blockquote', 'code-block'],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }],
          [{ align: [] }],
          ['clean']
        ]
      }
    },
    category: {
      origin: null,
      sub: null
    },
    writing: false
  }),

  computed: {
    ...mapGetters({
      token: 'auth/getUserToken'
    }),
    waitingText() {
      return this.writing ? '토픽 작성중...' : '토픽 작성하기'
    }
  },

  async created() {
    this.initialize()

    try {
      const { data } = await this.$axios.get('/api/topics/category')

      data.category.forEach((item) => (item.selected = false))
      data.sub.forEach((item) => (item.selected = false))

      this.category.origin = data.category
      this.category.sub = data.sub
    } catch (error) {}
  },

  beforeDestroy() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.topic.title = ''
      this.topic.content = ''
      this.writing = false
    },
    onEditorReady(editor) {
      this.editor = editor
    },
    onEditorInput({ html }) {
      this.topic.content = html
    },
    validateTopic() {
      const conditions = [
        !!this.topic.content,
        !!this.topic.title,
        this.topic.title.length > 5
      ]

      if (conditions.includes(false)) {
        return false
      }

      return true
    },
    async submitTopic() {
      if (!this.validateTopic()) {
        return
      }

      // 버튼 사용 불가 상태로 변경
      this.writing = true

      // 선택된 카테고리만 추출
      const extractCategory = (o, s) => {
        const origin = o.filter((item) => item.selected)
        const sub = s.filter((item) => item.selected)

        return {
          origin,
          sub
        }
      }

      const categories = extractCategory(
        this.category.origin,
        this.category.sub
      )

      const topic = {
        title: this.topic.title,
        content: this.topic.content,
        categories,
        date: this.$convertDate(new Date())
      }

      try {
        await this.$axios.post('/api/topics/new', topic, {
          headers: {
            authorization: `Bearer ${this.token}`
          }
        })
      } catch (error) {
        console.error(error)
      } finally {
        // 버튼 상태 변경
        this.writing = false
      }
    }
  }
}
</script>

<style lang="postcss">
.input-reset {
  @apply w-full py-2;
}

.input-reset:focus {
  @apply outline-none border-b-2 border-orange-300;
}

.wrapper-editor {
  width: 56rem;
  max-width: 56rem;
}

.head .separate {
  flex-basis: 50%;
}

.head .separate:first-child {
  @apply mr-4;
}

.area-button > button:disabled {
  @apply bg-orange-800;
}
</style>
