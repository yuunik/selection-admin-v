import { createApp, h } from 'vue'
// svg icon support
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'
// uno.css
import 'virtual:uno.css'

import App from '@/App.vue'
import globalComponents from './components'
import router from '@/router'
import store from '@/store'

import '@/styles/index.scss'
import './permission'

const app = createApp(App)

// amount pinia
app.use(store)
// 注册全局组件
app.use(globalComponents)
// amount router
app.use(router)

// 挂载app实例
app.mount('#app')
