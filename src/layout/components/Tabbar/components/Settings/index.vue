<script setup lang="ts">
import { useLayoutSettingStore, useUserStore } from '@/store'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 获取修改刷新状态的方法
const { changeIsRefresh } = useLayoutSettingStore()

// 获取用户信息
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// 是否为全屏状态
const isFullScreen = ref(false)
// 全屏按钮的点击事件
const onFullScreen = () => {
  if (!document.fullscreenElement) {
    // 进入全屏
    isFullScreen.value = true
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏
    isFullScreen.value = false
    document.exitFullscreen()
  }
}

// 阻止默认全屏事件, 强制使用 api 全屏
const onStopUseF11 = (e: KeyboardEvent) => {
  if (e.key === 'F11') {
    // 阻止默认全屏事件
    e.preventDefault()
    // 强制使用 api 全屏
    onFullScreen()
  }
}

// 组件挂载时监听浏览器窗口尺寸大小的变化
onMounted(() => {
  window.addEventListener('keydown', onStopUseF11)
})

// 组件销毁时移除监听浏览器窗口尺寸大小的变化
onUnmounted(() => {
  window.removeEventListener('keydown', onStopUseF11)
})

// 获取路由器
const router = useRouter()
// 获取当前路由
const route = useRoute()

// 退出登录
const onLogout = async () => {
  try {
    await userStore.fetchLogout()
    console.log('@@@@@@@@@@@@', userInfo.value)
    // 退出成功, 则跳转登录页面
    router.push({ path: '/login', query: { redirect: route.path } })
  } catch (error) {
    // 退出失败, 则提示错误信息
    ElMessage.error((error as Error).message)
  }
}
</script>

<template>
  <div flex-center>
    <!-- 刷新按钮 -->
    <el-tooltip content="刷新" placement="bottom">
      <el-button
        type="default"
        plain
        circle
        icon="Refresh"
        size="small"
        @click="changeIsRefresh"
      />
    </el-tooltip>
    <!-- 全屏按钮 -->
    <el-tooltip
      :content="isFullScreen ? '退出全屏' : '全屏'"
      placement="bottom"
    >
      <el-button
        type="default"
        plain
        circle
        :icon="isFullScreen ? 'ZoomOut' : 'FullScreen'"
        size="small"
        @click="onFullScreen"
      />
    </el-tooltip>
    <!-- 基础设置按钮 -->
    <el-tooltip content="基础设置" placement="bottom">
      <el-button type="default" plain circle icon="Setting" size="small" />
    </el-tooltip>
    <!-- 用户头像 -->
    <el-avatar
      shape="circle"
      size="small"
      :src="userInfo.avatar"
      fit="cover"
      ml12
      cursor-pointer
      active:border-solid-1
      active:position-absolute
      active:top-100
      active:right-100
      active:w-250
      active:h-250
      active:block
      active:rounded-8
      transition-default
    />
    <!-- 用户退出模块 -->
    <el-dropdown ml12>
      <!-- 用户名 -->
      <em cursor-pointer flex-center>
        {{ userInfo.name }}
        <el-icon ml5>
          <arrow-down />
        </el-icon>
      </em>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="CloseBold">
            <el-popconfirm
              title="是否确认退出登录?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="onLogout"
            >
              <template #reference>
                <strong text-red-5>安全退出</strong>
              </template>
            </el-popconfirm>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped></style>
