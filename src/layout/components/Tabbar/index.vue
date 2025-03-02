<script setup lang="ts">
import { useLayoutSettingStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

// 折叠图标类名
const iconClass = computed(() => (isFold.value ? 'i-ep:expand' : 'i-ep:fold'))
const layoutSettingStore = useLayoutSettingStore()
const { isFold } = storeToRefs(layoutSettingStore)
</script>

<template>
  <div h-full flex-between box-border>
    <!-- 面包屑容器 -->
    <div flex-middle>
      <!-- 折叠图标 -->
      <i
        :class="iconClass"
        icon-style
        @click="layoutSettingStore.changeIsFold()"
        m10
      ></i>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>基础设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 基础设置 -->
    <div>2</div>
  </div>
</template>

<style lang="scss" scoped></style>
