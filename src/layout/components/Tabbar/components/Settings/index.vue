<script setup lang="ts">
import { useLayoutSettingStore } from '@/store'
import { onMounted, onUnmounted, ref } from 'vue'

// 获取修改刷新状态的方法
const { changeIsRefresh } = useLayoutSettingStore()

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
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      fit="cover"
      ml12
      cursor-pointer
      hover:border-primaryColor
    />
    <!-- 用户退出模块 -->
    <el-dropdown ml12>
      <!-- 用户名 -->
      <em cursor-pointer flex-center>
        Chorria
        <el-icon ml5>
          <arrow-down />
        </el-icon>
      </em>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="CloseBold">
            <strong text-red-5>安全退出</strong>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped></style>
