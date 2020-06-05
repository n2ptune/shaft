<template>
  <tr>
    <td>{{ item.title }}</td>
    <td>{{ item.categoryName }}</td>
    <td>{{ item.views }}</td>
    <td>{{ item.likeCount }}</td>
    <td>{{ item.ownerID }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
tr td {
  &:first-child {
    @apply font-bold;
  }

  &:nth-child(3),
  &:nth-child(4) {
    @apply text-center;
  }
}
</style>
