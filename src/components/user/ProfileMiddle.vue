<template>
  <section class="my-12">
    <ul class="text-center">
      <li v-for="item in listOfCounts" :key="item.title">
        <p class="text-3xl font-bold">{{ item.value }}</p>
        <p class="text-gray-700">{{ item.title }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    count: {
      type: Object,
      required: true
    }
  },

  computed: {
    listOfCounts() {
      const list = []
      const titleFromKey = (key) => {
        // key: ['topic', 'comment', 'like']
        switch (key) {
          case 'topic':
            return '토픽 수'
          case 'comment':
            return '댓글 수'
          case 'like':
            return '받은 좋아요 수'
        }
      }

      for (const key in this.count) {
        list.push({
          value: this.count[key],
          title: titleFromKey(key)
        })
      }

      return list
    }
  }
}
</script>

<style lang="postcss" scoped>
section ul li {
  @apply inline-block;

  &:not(:last-of-type) {
    @apply mr-6;
  }
}
</style>
