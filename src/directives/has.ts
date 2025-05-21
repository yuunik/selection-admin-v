import type { App } from 'vue'

export const isButton = (app: App) => {
  app.directive('has', {
    mounted(el, binding) {
      if (binding.value === 3) {
        // 若菜单层级为 3，则隐藏该按钮
        el.style.visibility = 'hidden'
      }
    },
  })
}
