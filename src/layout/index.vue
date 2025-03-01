<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'

import { useUserStore } from '@/store'
import { greeting } from '@/utils'
import Logo from './components/Logo/index.vue'
import Menu from './components/MenuItem/index.vue'

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
  <div h-full flex>
    <!-- 菜单栏 -->
    <nav w-menu bg-emerald h-full bg-menuColor>
      <!-- 网站 logo -->
      <Logo />
      <!-- 菜单栏 -->
      <el-menu backgroundColor="#001529" textColor="#fff" class="b-n">
        <Menu :userMenuRoutes="userStore.userMenuRoutes" />
      </el-menu>
    </nav>
    <!-- 操作区 -->
    <div flex-1 h-full>
      <!-- tabbar 栏 -->
      <header h100 bg-red></header>
      <!-- 内容区 -->
      <main hc100 bg-amber></main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.b-n {
  border: none;
}
</style>
