<script setup lang="ts">
import settings from '@/settings'
import { useLayoutSettingStore } from '@/store'
import { storeToRefs } from 'pinia'

const { isShow, imgPath, websiteTitle } = settings

const layoutSettingStore = useLayoutSettingStore()
const { isFold } = storeToRefs(layoutSettingStore)
</script>

<template>
  <div h50 flex-center v-show="isShow">
    <img :src="imgPath" alt="网站图标" w45 h45 />
    <em text-white text-25 v-show="!isFold">{{ websiteTitle }}</em>
  </div>
</template>

<style lang="scss" scoped></style>
