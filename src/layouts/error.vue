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
    console.log(this.error)
  }
}
</script>
