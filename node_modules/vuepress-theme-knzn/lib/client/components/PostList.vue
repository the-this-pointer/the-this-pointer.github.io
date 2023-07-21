<script setup lang="ts">
import type { PropType } from 'vue'
import { toRefs } from 'vue'
import type { ThemePageData } from '../../node'
import PostItem from './PostItem.vue'

const props = defineProps({
  pages: {
    type: Array as PropType<ThemePageData[]>,
    required: true,
  },
})

const { pages } = toRefs(props)
</script>
<template>
  <div class="post-list">
    <template v-if="pages.length">
      <PostItem
        v-for="(post, index) of pages"
        :key="post.key"
        :post="post"
        :post-position="'right'"
      />
    </template>
    <div v-else class="empty-container">
      <i class="iconfont icon-empty"></i>
      <span> No posts </span>
    </div>
  </div>
</template>
