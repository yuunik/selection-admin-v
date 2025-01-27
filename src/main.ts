import { createApp } from 'vue'
// svg icon support
import 'virtual:svg-icons-register'

import App from '@/App.vue'
import globalComponents from './components'

import '@/style.css'

const app = createApp(App)
// 注册全局组件
app.use(globalComponents)
// 挂载app实例
app.mount('#app')
