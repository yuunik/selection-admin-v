<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useLayoutSettingStore } from '@/store'

// 折叠图标类名
const iconClass = computed(() => (isFold.value ? 'i-ep:expand' : 'i-ep:fold'))
const layoutSettingStore = useLayoutSettingStore()
const { isFold } = storeToRefs(layoutSettingStore)

console.log('测试提交')
</script>

<template>
  <!-- 面包屑容器 -->
  <div flex-middle>
    <!-- 折叠图标 -->
    <i
      :class="iconClass"
      icon-style
      @click="layoutSettingStore.changeIsFold()"
      mr10
      w16
      h16
    ></i>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="route in $route.matched"
        :key="route.path"
        :to="route.path"
        v-show="route?.meta?.isShow"
      >
        <!-- 图标 -->
        <component :is="route?.meta?.icon" w15 h15 align-top mr5 />
        <!-- 标题 -->
        <span>{{ route?.meta?.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped></style>
