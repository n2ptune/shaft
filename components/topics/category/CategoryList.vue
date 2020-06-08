<template>
  <div class="category-list relative">
    <div v-if="category">
      <ul class="flex flex-wrap">
        <li
          v-for="item in category"
          :key="item.id"
          :class="item.selected ? 'select' : ''"
          class="category-item"
          @click="selectItem(item, $event)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div v-else class="fetching">
      데이터 가져오는 중...
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Array,
      required: false,
      default: () => []
    },
    multiselect: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    selectItem(item, $event) {
      if (this.multiselect) {
        if (item.selected) {
          item.selected = false
          return
        }

        const selectedLength = this.category.filter((item) => item.selected)
          .length

        if (selectedLength >= 5) {
          return
        }

        item.selected = true
      } else {
        this.category
          .filter((item) => item.selected)
          .map((item) => (item.selected = false))

        item.selected = true
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.category-item {
  @apply border border-gray-400 rounded-full px-4 py-1 mr-2 mb-2 text-sm
  transition-colors duration-300 bg-white text-gray-600 cursor-pointer;
}
.category-item:hover,
.category-item.select {
  @apply text-white;
}
.category-item:hover {
  @apply bg-orange-400 border-transparent;
}
.category-item.select {
  @apply bg-orange-500 border-transparent;
}
</style>
