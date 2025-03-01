<script setup lang="ts">
import settings from '@/settings'

const { isShow, imgPath, websiteTitle } = settings
</script>

<template>
  <div h50 flex-center v-show="isShow">
    <img :src="imgPath" alt="网站图标" />
    <em text-white text-25>{{ websiteTitle }}</em>
  </div>
</template>

<style lang="scss" scoped></style>
