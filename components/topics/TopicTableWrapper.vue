<template>
  <div>
    <div class="text-xl font-bold mb-6">
      <slot name="descriptor" />
    </div>
    <table class="w-full">
      <thead>
        <slot name="header">
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Views</th>
            <th>Writer</th>
          </tr>
        </slot>
      </thead>
      <tbody>
        <slot name="default" />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
table thead tr th {
  @apply text-left text-gray-600 font-normal text-sm;
}
table thead tr th,
table tbody tr >>> td {
  /* Table Width */
  &:first-child {
    /* Title */
    width: 80%;
  }

  &:nth-child(2),
  &:nth-child(3) {
    @apply hidden;
  }

  &:nth-child(4) {
    /* Writer */
    width: 20%;
  }
}

@screen lg {
  table thead tr th,
  table tbody tr >>> td {
    /* table width */
    &:first-child {
      /* Title */
      width: 50%;
    }

    &:nth-child(2),
    &:nth-child(3) {
      display: table-cell;
    }

    &:nth-child(2) {
      /* Category */
      width: 15%;
    }

    &:nth-child(3) {
      /* Views */
      width: 15%;
    }

    &:nth-child(4) {
      /* Writer */
      width: 20%;
    }
  }
}
</style>
