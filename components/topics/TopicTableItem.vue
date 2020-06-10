<template>
  <tr>
    <td>
      <nuxt-link :to="`/topics/${item.id}`">
        <div class="font-bold text-lg">
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
        <UserAvatar :src="item.userAvatar" :alt="item.userNickname" />
      </nuxt-link>
    </td>
  </tr>
</template>

<script>
import relativeTime from 'dayjs/plugin/relativeTime'
import CategoryBadge from './category/CategoryBadge'
import UserAvatar from '@/components/user/Avatar'

export default {
  components: {
    UserAvatar,
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
  &:nth-child(3),
  &:nth-child(4) {
    @apply text-center text-sm;
  }
}
</style>
