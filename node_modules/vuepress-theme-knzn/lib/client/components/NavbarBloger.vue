<script setup lang="ts">
import { usePages } from '../hooks'
import { useBloger } from '../hooks/useBloger'
import { getInfoFromPages } from '../utils'
import { withBase } from '@vuepress/client'

const pages = usePages()

const tags = getInfoFromPages(pages, 'tags')
const categories = getInfoFromPages(pages, 'categories')

const tagsPostNum = tags.reduce((res, item) => {
  res += item.num
  return res
}, 0)

const categoriesPostNum = categories.reduce((res, item) => {
  res += item.num
  return res
}, 0)

const { avatarSrc, blogger, slogan } = useBloger()
</script>
<template>
  <div class="navbar-blogger">
    <div class="avatar">
      <img :src="withBase(avatarSrc || '')" alt="Avatar" title="Avatar" />
    </div>
    <div class="types">
      <RouterLink to="/categories/?category=all" class="type">
        <span class="text">Categories</span>
        <span class="num">{{ categoriesPostNum }}</span>
      </RouterLink>
      <div class="divider"></div>
      <RouterLink to="/tags/?tag=all" class="type">
        <span class="text">Tags</span>
        <span class="num">{{ tagsPostNum }}</span>
      </RouterLink>
    </div>
    <div class="blogger">
      <div class="name">{{ blogger }}</div>
      <p class="slogan" :title="slogan">
        {{ slogan }}
      </p>
    </div>
  </div>
</template>
