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
        ? `/topics/category/${this.parseID}?p=1`
        : `/topics/sub-category/${this.parseID}?p=1`
    }
  }
}
</script>

<style lang="postcss" scoped>
article {
  @apply block;

  & .item {
    @apply py-1 px-4 rounded-lg mb-1 mr-1 text-sm font-light
    text-orange-700 bg-orange-200
    transition-colors duration-200;

    &:hover {
      @apply bg-orange-300;
    }
  }
}
</style>
