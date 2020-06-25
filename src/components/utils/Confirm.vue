<template>
  <transition>
    <section v-if="isShow" class="outer-wrap">
      <section class="inner-wrap">
        <header class="text-center font-bold text-lg">
          <p>{{ title }}</p>
        </header>
        <main v-if="isEditor">
          <div>
            <textarea
              v-model="editorValue"
              :style="{ resize: 'none' }"
              cols="50"
              rows="5"
              placeholder="수정할 내용을 입력하세요."
              class="p-2 focus:outline-none border border-gray-200 rounded-lg focus:border-gray-400"
            ></textarea>
          </div>
        </main>
        <main v-else>
          <p>
            {{ body }}
          </p>
        </main>
        <footer>
          <button @click="wrapOnSubmit">
            확인
          </button>
          <button @click="wrapOnCancel">
            취소
          </button>
        </footer>
      </section>
    </section>
  </transition>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '기본 타이틀'
    },
    body: {
      type: String,
      default: '기본 바디'
    },
    isEditor: {
      type: Boolean,
      default: false
    },
    onSubmit: {
      type: Function,
      default() {
        return () => {}
      }
    },
    onCancel: {
      type: Function,
      default() {
        return () => {}
      }
    }
  },

  data: () => ({
    editorValue: ''
  }),

  created() {
    if (this.isEditor) {
      this.editorValue = this.body.toString()
    }
  },

  methods: {
    wrapOnSubmit() {
      if (this.isEditor) {
        this.onSubmit(this.editorValue)
      } else {
        this.onSubmit()
      }
    },
    wrapOnCancel() {
      this.onCancel()
    }
  }
}
</script>

<style lang="postcss" scoped>
.outer-wrap {
  @apply flex justify-center items-center w-full h-screen fixed top-0 left-0;

  background-color: rgba(0, 0, 0, 0.35);
  z-index: 100;

  & .inner-wrap {
    @apply max-w-xl bg-white rounded-lg shadow-xl overflow-y-auto;

    & main {
      @apply py-3;
    }

    & > *:not(:last-child) {
      @apply border-b border-gray-300;
    }

    & > * > * {
      @apply p-3;
    }

    & footer {
      @apply flex justify-end p-4;

      & button {
        @apply py-3 px-6 mx-2 rounded-lg;

        &:focus {
          @apply outline-none;
        }

        &:first-of-type {
          @apply bg-green-400 text-white;

          &:hover {
            @apply bg-green-600;
          }
        }

        &:last-of-type {
          @apply bg-gray-200;

          &:hover {
            @apply bg-gray-300;
          }
        }
      }
    }
  }
}
</style>
