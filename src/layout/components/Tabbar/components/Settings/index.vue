<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
</script>

<template>
  <div flex-center>
    <!-- 刷新按钮 -->
    <el-tooltip content="刷新" placement="bottom">
      <el-button type="default" plain circle icon="Refresh" size="small" />
    </el-tooltip>
    <!-- 全屏按钮 -->
    <el-tooltip content="全屏" placement="bottom">
      <el-button type="default" plain circle icon="FullScreen" size="small" />
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
