<template>
  <transition name="fade" appear>
    <div class="dropdown">
      <ul class="dropdown-list">
        <li class="dropdown-item">
          새 1
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  created() {}
}
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.dropdown {
  top: 45px;
  transform: translateX(-30%);
  @apply absolute max-w-xl bg-white rounded p-3 shadow border border-gray-300;
}
</style>
