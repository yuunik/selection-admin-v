import { App, Component } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import SvgIcon from './SvgIcon/index.vue'

// Declare a global component type
interface GlobalComponent {
  [componentName: string]: Component
}

// Register global components
const registeredComponents: GlobalComponent = { SvgIcon }

const globalComponent = {
  install(app: App) {
    Object.keys(registeredComponents).forEach((componentName: string) => {
      app.component(componentName, registeredComponents[componentName])
    })
    // 注册element-plus的所有图标组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}

export default globalComponent
