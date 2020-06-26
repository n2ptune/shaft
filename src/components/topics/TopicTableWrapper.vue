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
            <th>Date</th>
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

  &:last-child {
    @apply text-right;
  }
}

table thead tr th,
table tbody tr >>> td {
  /* Table Width */
  &:first-child {
    /* Title */
    width: 70%;

    @apply pr-4;
  }

  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    @apply hidden;
  }

  &:nth-child(5),
  &:last-child {
    width: 15%;
  }
}

table tbody tr {
  --border-vertical-size: 2rem;
  --border-horizontal-size: 0.7rem;

  border-top: var(--border-vertical-size) solid;
  border-bottom: var(--border-vertical-size) solid;
  border-left: var(--border-horizontal-size) solid;
  border-right: var(--border-horizontal-size) solid;

  border-color: transparent;
}

table tbody tr:nth-child(2n) {
  @apply bg-gray-200;
}

@screen lg {
  table thead tr th,
  table tbody tr >>> td {
    /* table width */
    &:first-child {
      /* Title */
      width: 50%;

      @apply pr-8;
    }

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      display: table-cell;
    }

    &:nth-child(2) {
      /* Category */
      width: 10%;
    }

    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      width: 10%;
    }

    &:last-child {
      /* Writer */
      width: 10%;
    }
  }
}
</style>
