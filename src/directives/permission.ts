import type { App } from 'vue'
import store, { useUserStore } from '@/store'

const userStore = useUserStore(store)

const permission = (app: App) => {
  app.directive('permission', {
    mounted(el: HTMLElement, binding: any) {
      if (!userStore.getUserButtonList().includes(binding.value)) {
        // has permission
        if (binding.value === 'addUser') {
          return el.remove()
        }
        el.style.visibility = 'hidden'
      }
    },
  })
}

export default permission
