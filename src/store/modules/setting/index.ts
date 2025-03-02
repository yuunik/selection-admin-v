import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLayoutSettingStore = defineStore('layoutSettingStore', () => {
  // 菜单栏是否折叠
  const isFold = ref(false)

  // 内容区是否刷新
  const isRefresh = ref(false)

  // 修改折叠状态
  const changeIsFold = () => (isFold.value = !isFold.value)

  // 修改刷新状态
  const changeIsRefresh = () => (isRefresh.value = !isRefresh.value)

  return {
    isFold,
    isRefresh,
    changeIsFold,
    changeIsRefresh,
  }
})

export default useLayoutSettingStore
