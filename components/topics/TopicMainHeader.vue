<template>
  <div class="mb-6">
    <div class="descriptor">
      <span>#{{ topicId }}</span>
      <span>{{ formatDate }}</span>
    </div>
    <div class="text-2xl font-bold">
      {{ title }}
    </div>
    <div class="mt-2">
      <div v-for="item in countList" :key="item.name" class="count-info-wrap">
        <fa-layers class="fa-fw fa-lg">
          <fa :icon="item.icon" color="black" />
          <span
            :style="{ fontSize: '1.8em', right: '-2px', bottom: '-5px' }"
            class="fa-layers-counter fa-layers-bottom-right"
            v-text="item.count"
          />
        </fa-layers>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    topicId: {
      type: Number,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    likeCount: {
      type: Number,
      required: true
    },
    views: {
      type: Number,
      required: true
    }
  },

  computed: {
    formatDate() {
      return (
        this.$dayjs(this.createdAt).format('YYYY-MM-DD HH:MM:ss') + '에 작성됨'
      )
    },
    countList() {
      return [
        {
          name: '좋아요 수',
          icon: ['far', 'thumbs-up'],
          count: this.likeCount
        },
        {
          name: '조회수',
          icon: ['far', 'eye'],
          count: this.views
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
.descriptor > *:not(:first-child) {
  @apply mx-1;
}

.descriptor {
  @apply text-sm text-gray-500;
}

.count-info-wrap {
  @apply inline-block;

  &:not(:first-of-type) {
    @apply mx-1;
  }
}

/* .count-info-wrap {
  @apply inline-block align-middle;

  &:not(:first-of-type) {
    @apply mx-4;
  }
}

.count {
  @apply text-sm align-top text-black;
} */
</style>
