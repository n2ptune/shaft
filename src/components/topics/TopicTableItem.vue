<template>
  <tr>
    <td>
      <nuxt-link :to="`/topics/${item.id}`">
        <div class="font-bold text-md">
          {{ item.title }}
        </div>
      </nuxt-link>
    </td>
    <td>
      <CategoryBadge
        v-if="item.categoryName"
        :badge-color="item.categoryColor"
        :badge-name="item.categoryName"
      />
    </td>
    <td>{{ item.views }}</td>
    <td>{{ item.likeCount }}</td>
    <td class="text-sm">
      {{ comDate }}
    </td>
    <td class="text-right">
      <nuxt-link
        class="inline-block align-middle"
        :to="`/users/${item.ownerID}`"
      >
        <Avatar :src="item.userAvatar" :alt="item.userNickname" :size="25" />
      </nuxt-link>
    </td>
  </tr>
</template>

<script>
import relativeTime from 'dayjs/plugin/relativeTime'
import CategoryBadge from './category/CategoryBadge.vue'
import Avatar from '@/components/user/Avatar.vue'

export default {
  components: {
    Avatar,
    CategoryBadge
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    comDate() {
      return this.$dayjs().to(this.$dayjs(this.item.createdAt))
    }
  },

  created() {
    this.$dayjs.extend(relativeTime)
  }
}
</script>

<style lang="postcss" scoped>
tr td {
  word-break: break-all;

  &:first-child {
    @apply text-base;
  }

  &:nth-child(2) {
    @apply text-sm;
  }

  &:nth-child(3),
  &:nth-child(4) {
    @apply text-center text-sm;
  }

  &:nth-child(5) {
    @apply text-xs;
  }
}

@screen lg {
  tr td {
    &:first-child {
      @apply text-base;
    }

    &:nth-child(5) {
      @apply text-sm;
    }
  }
}
</style>
