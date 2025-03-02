<script setup lang="ts">
import Breadcrumb from './components/Breadcrumb/index.vue'
import Settings from './components/Settings/index.vue'
</script>

<template>
  <div h-full flex-between box-border border>
    <!-- 面包屑 -->
    <Breadcrumb />
    <!-- 基础设置 -->
    <Settings />
  </div>
</template>

<style lang="scss" scoped></style>
