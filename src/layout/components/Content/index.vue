<script setup lang="ts">
import { useLayoutSettingStore } from '@/store'
import { storeToRefs } from 'pinia'
import { nextTick, watch } from 'vue'

// 获取 layoutSettingStore
const layoutSettingStore = useLayoutSettingStore()
// 获取 isRefresh
const { isRefresh } = storeToRefs(layoutSettingStore)

// 监听刷新状态
watch(isRefresh, (val) => {
  if (val) {
    nextTick(() => {
      // 组件更新完成后, 重新挂载二级路由组件
      layoutSettingStore.changeIsRefresh()
    })
  }
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade">
      <component :is="Component" v-if="!isRefresh" />
    </Transition>
  </RouterView>
</template>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: 0.5s all linear;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
