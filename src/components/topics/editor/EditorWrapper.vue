<template>
  <div class="wrapper-editor">
    <Block v-if="!isReply" title="토픽 제목">
      <input
        v-model="topic.title"
        type="text"
        placeholder="토픽 제목을 입력하세요."
        class="input-reset"
      />
    </Block>
    <div v-if="!isReply" class="flex flex-col lg:flex-row head mb-12">
      <Block title="카테고리(단일 지정)" class="separate">
        <CategoryList :category="category.origin" />
      </Block>
      <Block title="서브 카테고리(복수 지정)" class="separate">
        <CategoryList :category="category.sub" :multiselect="true" />
      </Block>
    </div>
    <Block :title="topicContentTitle" class="editor-wrapper">
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
import QuillWrapper from './QuillWrapper'
import CategoryList from '@/components/topics/category/CategoryList'
import { validateTopic } from '@/api/models/topics/validate'

export default {
  components: {
    Block,
    CategoryList,
    QuillWrapper
  },

  props: {
    isReply: {
      type: Boolean,
      required: false,
      default: false
    }
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
      token: 'auth/getUserToken',
      parentTopic: 'topic/getParentTopic'
    }),
    waitingText() {
      return this.writing ? '토픽 작성중...' : '토픽 작성하기'
    },
    topicContentTitle() {
      return this.isReply ? '토픽에 답글 달기' : '토픽 내용'
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
    async submitTopic() {
      const date = this.$convertDate(new Date())
      const isValidated = validateTopic({
        title: this.topic.title,
        content: this.topic.content,
        date,
        isReply: this.isReply
      })

      if (!isValidated) {
        // 토픽의 내용과 제목이 검증되지 않았을 경우
        // 이쪽에서 처리
        return
      }

      // 버튼 사용 불가 상태로 변경
      this.writing = true

      const topic = {
        title: this.topic.title,
        content: this.topic.content,
        date
      }

      if (!this.isReply) {
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

        topic.categories = categories
        topic.parent = null
      } else {
        topic.categories = {
          origin: [],
          sub: []
        }
        topic.parent = this.parentTopic.id
      }

      try {
        const { data: topicData } = await this.$axios.post(
          '/api/topics/new',
          topic
        )

        if (topicData.topic.parentTopicID) {
          this.$router.go()
        } else {
          this.$router.push('/topics/' + topicData.topic.id)
        }
      } catch (error) {
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
  @apply w-full mx-auto;
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
