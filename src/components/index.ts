import { App, Component } from 'vue'
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
  },
}

export default globalComponent
