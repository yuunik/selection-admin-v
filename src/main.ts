import { createApp } from 'vue'
// svg icon support
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'
// uno.css
import 'virtual:uno.css'

import App from '@/App.vue'
import globalComponents from './components'
import router from '@/router'
import store from '@/store'
import { isButton } from '@/directives/has'
import giveColor from '@/directives/color'

import '@/styles/index.scss'
import './permission'
import permission from '@/directives/permission'

const app = createApp(App)

// amount pinia
app.use(store)
// 注册全局组件
app.use(globalComponents)
// amount router
app.use(router)
// amount directive
isButton(app)
giveColor(app)
permission(app)

// 挂载app实例
app.mount('#app')
