<template>
  <section class="flex flex-wrap">
    <article class="mr-6">
      <Avatar :src="avatar" :is-rounded="false" :style="{ width: '7rem' }" />
    </article>
    <article>
      <div class="mb-2">
        <h1 class="font-bold text-2xl">
          {{ nickname }}
        </h1>
        <h3 class="font-light text-gray-500">
          {{ email }}
        </h3>
      </div>
      <div>
        <p>
          {{ intro || '소개글이 없습니다.' }}
        </p>
      </div>
    </article>
    <article class="profile-h-right">
      <ul>
        <li v-for="item in listWithIcon" :key="item.value" class="text-sm">
          <p class="inline-block">
            <fa :icon="item.icon" class="mr-2 text-gray-500" />
          </p>
          <p class="inline-block">
            {{ item.value }}
          </p>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
import Avatar from './Avatar.vue'

export default {
  components: {
    Avatar
  },

  props: {
    avatar: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    intro: {
      type: String,
      required: false,
      default: ''
    },
    createdAt: {
      type: String,
      required: true
    }
  },

  computed: {
    listWithIcon() {
      /** @type {Date} date */
      const date = new Date(this.createdAt)

      return [
        {
          icon: ['fas', 'user-clock'],
          value: `${date.getFullYear()}년 ${date.getMonth() +
            1}월 ${date.getDate()}일에 가입`
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
.profile-h-right {
  flex-basis: 100%;

  @apply mt-6;
}

@screen md {
  .profile-h-right {
    flex-basis: auto;

    @apply mt-0 ml-auto;
  }
}
</style>
