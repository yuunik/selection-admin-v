import { ElMessage } from 'element-plus'
import router from './router'
import store, { useUserStore } from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import settings from '@/settings'

/**
 * 路由鉴权
 */

// 获取用户状态管理库
const userStore = useUserStore(store)

// 取消小圆圈图标
NProgress.configure({ showSpinner: false })

// 获取网站标题
const { websiteTitle } = settings

// 前置路由守卫
router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 设置页面标题
  document.title = `${websiteTitle}/${to.meta.title}`
  // 获取 token
  const token = userStore.token
  // 获取用户信息
  const userInfo = userStore.userInfo

  // token 判断
  if (token) {
    // 用户已登录
    // 不能再到登录页面
    if (to.path === '/login') {
      // 无需登录提示
      ElMessage.info('您已登录, 无需再次登录')
      // 重定向到首页
      next('/')
    } else {
      // 用户信息判别
      if (userInfo.id) {
        // 有用户信息，放行
        next()
      } else {
        try {
          // 无用户信息，重新获取用户信息
          await userStore.fetchUserInfo()
          // 获取用户信息后, 放行
          next()
        } catch (error) {
          // 清除用户相关信息
          await userStore.fetchLogout()
          // token 失效，提示用户重新登录
          ElMessage.error('token失效, 请重新登录')
          // 重定向到登录页面
          next({ path: '/login', query: { redirect: from.path } })
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path === '/login') {
      // 登录页面直接放行
      next()
    } else {
      // 其他页面重定向到登录页面
      // 未登录提示
      ElMessage.info('未登录, 请先登录')
      next('/login')
    }
  }
})

// 后置路由守卫
router.afterEach((to, from, next) => {
  // 关闭进度条
  NProgress.done()
})
