import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLayoutSettingStore = defineStore('layoutSettingStore', () => {
  // 菜单栏是否折叠
  const isFold = ref(false)

  // 修改折叠状态
  const changeIsFold = () => (isFold.value = !isFold.value)

  return {
    isFold,
    changeIsFold,
  }
})

export default useLayoutSettingStore
