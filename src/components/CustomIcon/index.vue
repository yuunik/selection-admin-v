<script setup lang="ts">
// 接收数据的类型申明
interface IconProps {
  icon: string
}
// 定义props
defineProps<IconProps>()
</script>

<template>
  <el-icon>
    <component :is="icon" />
  </el-icon>
</template>
