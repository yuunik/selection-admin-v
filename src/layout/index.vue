<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'

import { useLayoutSettingStore, useUserStore } from '@/store'
import { greeting } from '@/utils'
import Logo from './components/Logo/index.vue'
import MenuItem from './components/MenuItem/index.vue'
import Tabbar from './components/Tabbar/index.vue'
import Content from './components/Content/index.vue'
import { storeToRefs } from 'pinia'

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
// 获取设置的状态管理库
const layoutSettingStore = useLayoutSettingStore()
// 获取菜单栏的折叠状态
const { isFold } = storeToRefs(layoutSettingStore)
// 菜单栏类名
const menuClass = computed(() =>
  isFold.value ? 'wf-menu-width' : 'wb-menu-width',
)
</script>

<template>
  <div h-full flex>
    <!-- 菜单栏 -->
    <nav :class="menuClass" bg-emerald h-full bg-menuColor transition-all>
      <!-- 网站 logo -->
      <Logo />
      <!-- 菜单栏 -->
      <el-menu
        backgroundColor="#001529"
        textColor="#fff"
        class="b-n"
        hc50
        overflow-auto
        :collapse="isFold"
        :collapse-transition="false"
      >
        <MenuItem :userMenuRoutes="userStore.userMenuRoutes" />
      </el-menu>
    </nav>
    <!-- 操作区 -->
    <div flex-1 h-full transition-all>
      <!-- tabbar 栏 -->
      <header h5 p20 box-border class="b-bottom-1">
        <Tabbar />
      </header>
      <!-- 内容区 -->
      <main hc50 overflow-auto p20>
        <Content />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.b-n {
  border: none;
}

.b-bottom-1 {
  border-bottom: 1px solid #ccc;
}
</style>
