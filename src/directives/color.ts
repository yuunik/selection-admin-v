import type { App } from 'vue'

const giveColor = (app: App) => {
  app.directive('color', {
    mounted(el: HTMLElement, binding: any) {
      if (binding.value === 2) {
        el.style.color = 'orange'
      }
    },
  })
}

export default giveColor
