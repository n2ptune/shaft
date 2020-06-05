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
            <th>Likes</th>
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

  &:nth-child(3),
  &:nth-child(4) {
    @apply text-center;
  }
}

table thead tr th,
table tbody tr >>> td {
  /* Table Width */
  &:first-child {
    /* Title */
    width: 80%;
  }

  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    @apply hidden;
  }

  &:last-child {
    /* Writer */
    width: 20%;
  }
}

table tbody tr {
  --border-size: 2rem;

  border-top: var(--border-size) solid;
  border-bottom: var(--border-size) solid;
  border-color: transparent;
}

@screen lg {
  table thead tr th,
  table tbody tr >>> td {
    /* table width */
    &:first-child {
      /* Title */
      width: 40%;
    }

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      display: table-cell;
    }

    &:nth-child(2) {
      /* Category */
      width: 20%;
    }

    &:nth-child(3) {
      /* Views */
      width: 10%;
    }

    &:nth-child(4) {
      /* Likes */
      width: 10%;
    }

    &:last-child {
      /* Writer */
      width: 20%;
    }
  }
}
</style>
