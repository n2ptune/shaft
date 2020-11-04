<template>
  <div>error</div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  layout: 'error-layout',

  created() {
    // eslint-disable-next-line
    console.error(this.error)
  }
}
</script>
