<template>
  <transition name="fade" appear>
    <div class="dropdown">
      <ul class="dropdown-list text-sm">
        <nuxt-link to="/topics/new" class="dropdown-item">
          <li>
            새 토픽 작성하기
          </li>
        </nuxt-link>
        <nuxt-link :to="`/users/${user.id}`" class="dropdown-item">
          <li class="no-line">
            내 정보 보기
          </li>
        </nuxt-link>
        <a
          href=""
          class="dropdown-item"
          @click.prevent="$store.dispatch('auth/logout')"
        >
          <li>
            로그아웃
          </li>
        </a>
      </ul>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  }
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
  width: 150px;
  top: 110%;
  transform: translateX(-75%);
  @apply absolute bg-white rounded shadow-lg border border-gray-300;

  @screen md {
    transform: translateX(-35%);
  }
}
.dropdown-list a:hover {
  @apply font-bold;
}
.dropdown-item li {
  @apply px-3 py-2;
}
.dropdown-item:not(:last-child) li:not(.no-line) {
  @apply border-b border-gray-300;
}
</style>
