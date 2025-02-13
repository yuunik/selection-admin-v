<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/store'

// 获取用户状态管理库
const userStore = useUserStore()

// 页面加载完成后执行
onMounted(() => {
  // 获取用户信息
  getUserInfo()
})

// 获取用户信息
const getUserInfo = async () => {
  await userStore.fetchUserInfo()
}
</script>

<template>
  <div>
    <h1>Layout Page</h1>
  </div>
</template>

<style lang="scss" scoped></style>
