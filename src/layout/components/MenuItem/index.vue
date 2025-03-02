<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

import MenuItem from '@/layout/components/MenuItem/index.vue'
import CustomIcon from '@/components/CustomIcon/index.vue'

// 接收数据的类型申明
interface MenuItemProp {
  userMenuRoutes: RouteRecordRaw[]
}

// 定义props
defineProps<MenuItemProp>()
</script>

<template>
  <!-- 菜单栏子元素 -->
  <template v-for="route in userMenuRoutes" :key="route.path">
    <!-- 路由没有子路由 -->
    <el-menu-item
      :index="route.path"
      v-if="route.meta?.isShow && !route.children"
      @click="$router.push(route.path)"
    >
      <!-- 菜单图标 -->
      <CustomIcon :icon="route.meta?.icon as string" />
      <!-- 菜单标题 -->
      <template #title>
        <em>{{ route.meta?.title }}</em>
      </template>
    </el-menu-item>
    <!-- 路由有且仅有一个子路由 -->
    <el-menu-item
      :index="route.path"
      v-if="
        route.children &&
        route.children![0].meta?.isShow &&
        route.children.length === 1
      "
      @click="$router.push(route.path)"
    >
      <!-- 菜单图标 -->
      <CustomIcon :icon="route.children[0].meta.icon as string" />
      <!-- 菜单标题 -->
      <template #title>
        <em>{{ route.children[0].meta?.title }}</em>
      </template>
    </el-menu-item>
    <!-- 路由有路由且大于一个子路由 -->
    <el-sub-menu
      :index="route.path"
      v-if="route.children && route.children.length > 1"
    >
      <!-- 菜单标题 -->
      <template #title>
        <!-- 菜单图标 -->
        <CustomIcon :icon="route.meta?.icon as string" />
        <!-- 菜单标题 -->
        <span>{{ route.meta?.title }}</span>
      </template>
      <MenuItem :userMenuRoutes="route.children" />
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped></style>
