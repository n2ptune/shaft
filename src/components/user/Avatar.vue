<template>
  <img
    :class="[isRounded ? 'rounded-full' : '', size]"
    :src="userAvatarSrc"
    :alt="userNickname"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
      default: null
    },
    alt: {
      type: String,
      required: false,
      default: null
    },
    isRounded: {
      type: Boolean,
      required: false,
      default: true
    },
    size: {
      type: String,
      required: false,
      default: 'base'
    }
  },

  computed: {
    userAvatarSrc() {
      return this.src || this.$store.getters['auth/getUserAvatar']
    },
    userNickname() {
      return this.alt || this.$store.getters['auth/getUserNickname']
    }
  }
}
</script>

<style lang="postcss" scoped>
img {
  height: auto;
  border: 2px solid white;

  &.base {
    width: 2rem;
  }

  &.sm {
    width: 1.5rem;
    height: 1.5rem;
  }

  &.lg {
    width: 2.5rem;
    height: 2.5rem;
  }

  &.xl {
    width: 2.75rem;
    height: 2.75rem;
  }

  &.xl-2 {
    width: 4rem;
    height: 4rem;
  }

  &.xl-4 {
    width: 5rem;
    height: 5rem;
  }
}
</style>
