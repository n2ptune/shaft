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
    <Block
      :title="topicContentTitle"
      :no-border="noBorder"
      class="editor-wrapper"
    >
      <QuillWrapper
        :content="topic.content"
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
import Block from './EditorBlock.vue'
import QuillWrapper from './QuillWrapper.vue'
import CategoryList from '@/components/topics/category/CategoryList.vue'
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
    },
    noBorder: {
      type: Boolean,
      required: false,
      default: false
    },
    /** @type {import('vue').PropOptions<{
     * content: String,
     * createdAt: String,
     * id: Number,
     * isDel: Number,
     * originCategoryID: Number,
     * ownerID: Number,
     * parentTopicID: Number | null,
     * subCategoryID: String,
     * title: String | null,
     * updatedAt: String | null,
     * views: Number
     * }>} */
    isEdit: {
      type: Object,
      required: false,
      default: () => {}
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
      if (this.isEdit) {
        return this.writing ? '토픽 수정중...' : '토픽 수정하기'
      } else {
        return this.writing ? '토픽 작성중...' : '토픽 작성하기'
      }
    },
    topicContentTitle() {
      if (this.isEdit) {
        return '토픽 수정하기'
      } else {
        return this.isReply ? '토픽에 답글 달기' : '토픽 내용'
      }
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

    // 모드가 수정 모드일 경우
    if (this.isEdit) {
      // 카테고리 선택
      // 메인 카테고리
      if (this.isEdit.originCategoryID) {
        const target = this.category.origin.find(
          (category) => category.id === this.isEdit.originCategoryID
        )

        if (target !== undefined) {
          target.selected = true
        }
      }
      // 서브 카테고리
      if (this.isEdit.subCategoryID) {
        // 구분자에 의해 배열로 나눠지고 카테고리 배열과 비교를 위해
        // 아이디 값을 정수로 변환
        const spreadCat = this.isEdit.subCategoryID
          .split(',')
          .map((el) => parseInt(el))
        // 나눠진 배열에 카테고리 아이디 값이 포함되어 있는 객체 필터링
        const target = this.category.sub.filter((category) =>
          spreadCat.includes(category.id)
        )

        // 해당 카테고리 객체 선택
        target.map((category) => (category.selected = true))
      }

      // 해당 토픽이 부모 토픽일 경우
      if (!this.isEdit.parentTopicID) {
        // 제목 바인딩
        this.topic.title = this.isEdit.title
        // 내용 바인딩
        this.topic.content = this.isEdit.content
      }
    }
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
