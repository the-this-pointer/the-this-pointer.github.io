<script setup lang="ts">
import Medias from './Medias.vue'
import { useBloger } from '../hooks/useBloger'
import { withBase } from '@vuepress/client'

const { avatarSrc, blogger, slogan } = useBloger()
</script>
<template>
  <div class="avatar-wrapper card-box">
    <div class="avatar">
      <img :src="withBase(avatarSrc || '')" alt="Avatar" title="Avatar" />
    </div>
    <div class="blogger">
      <div class="name">{{ blogger }}</div>
      <p class="slogan" :title="slogan">
        {{ slogan }}
      </p>
    </div>
    <Medias />
  </div>
</template>
