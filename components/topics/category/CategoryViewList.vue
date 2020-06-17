<template>
  <article>
    <nuxt-link :to="isOriginRoute">
      <div class="item">
        {{ tag.name }}
      </div>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  // 태그 속성은 id, isOrigin, name
  props: {
    tag: {
      type: Object,
      required: true
    }
  },

  computed: {
    parseID() {
      if (typeof this.tag.id === 'string') {
        return parseInt(this.tag.id)
      } else {
        return this.tag.id
      }
    },
    isOriginRoute() {
      // FIXME: 토픽을 카테고리 별로 분류할 URL 지정 필요
      return this.tag.isOrigin
        ? `/topics/category/${this.parseID}`
        : `/topics/sub-category/${this.parseID}`
    }
  }
}
</script>

<style lang="postcss" scoped>
article {
  @apply block;

  & .item {
    @apply py-1 px-4 rounded-full mb-1 mr-2 text-sm
    text-white bg-orange-300
    transition-colors duration-200;

    &:hover {
      @apply bg-orange-500;
    }
  }
}
</style>
