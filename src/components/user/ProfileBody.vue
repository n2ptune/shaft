<template>
  <section class="my-12">
    <article>
      <div class="title">
        Top Tags
      </div>
    </article>
    <article>
      <div class="title">
        Top Topics
      </div>
    </article>
  </section>
</template>

<script>
export default {
  props: {}
}
</script>

<style lang="postcss" scoped>
article {
  @apply mt-6 mb-12;
}
div.title {
  @apply font-bold text-lg py-4 border-b border-gray-400;
}
</style>
