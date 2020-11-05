<template>
  <div class="flex flex-col justify-center items-center h-screen w-screen">
    <div class="text-lg font-bold text-gray-800">{{ error.statusCode }}</div>
    <div class="text-xl">{{ error.message }}</div>
  </div>
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
