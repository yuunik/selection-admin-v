<script setup lang="ts">
// 导入类型定义
interface Props {
  iconName: string
  prefix?: string
  width?: string
  height?: string
  color?: string
}

// 定义接收参数的类型，并使用 withDefaults 设置默认值
withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  width: '16px',
  height: '16px',
})
</script>
<template>
  <svg :style="{ width, height }">
    <use :xlink:href="`#${prefix}-${iconName}`" :fill="color" />
  </svg>
</template>
<style scoped lang="sass"></style>
