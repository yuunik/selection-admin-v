<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { useUserStore } from '@/store'
import { greeting } from '@/utils'

// 获取用户状态管理库
const userStore = useUserStore()

// 获取路由器
const router = useRouter()

// 页面加载完成后执行
onMounted(() => {
  // 获取用户信息
  getUserInfo()
})

// 问候语提示工具
const { timeMsg, timeIcon } = greeting()
// 获取用户信息
const getUserInfo = async () => {
  try {
    // 获取用户信息
    await userStore.fetchUserInfo()
    console.log('0----------', userStore.userInfo)
    // 问候语提示
    ElNotification({
      title: timeMsg,
      message: `欢迎回来, ${userStore.userInfo?.name}`,
      icon: timeIcon,
    })
  } catch (error) {
    // 错误提示
    ElMessage.error((error as Error).message)
    // 用户未登录, 跳转到登录页
    router.push('/login')
  }
}
</script>

<template>
  <div>
    <h1>Layout Page</h1>
  </div>
</template>

<style lang="scss" scoped></style>
