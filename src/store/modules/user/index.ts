import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import Cookies from 'js-cookie'
import type { RouteRecordRaw } from 'vue-router'

import { getUserInfoApi, loginApi, logoutApi } from '@/apis/login'
import type { LoginReqType, UserType } from '@/types/login'
import router, { asyncRoutes, constantRoutes, anyRoutes } from '@/router'
import { LAYER_SHORTCUTS } from 'unocss'

// 过滤异步路由
const filterAsyncRoutes = (
  asyncRoutes: RouteRecordRaw[],
  userAccessRoutes: string[],
) =>
  asyncRoutes.filter((asyncRoute) => {
    if (userAccessRoutes.includes(asyncRoute.name as string)) {
      if (asyncRoute.children && asyncRoute.children.length > 0) {
        asyncRoute.children = filterAsyncRoutes(
          asyncRoute.children as RouteRecordRaw[],
          userAccessRoutes,
        )
      }
      return true
    }
  })

const useUserStore = defineStore('userStore', () => {
  // state
  let token = ref<string>(Cookies.get('token') || '')
  let userInfo = reactive<UserType>({
    id: undefined,
    userName: '',
    password: '',
    name: '',
    phone: '',
    avatar: '',
    description: '',
    status: 0,
  })
  // 用户菜单权限
  const userMenuRoutes = ref<RouteRecordRaw[]>(constantRoutes)
  // 用户按钮权限列表
  const userButtonList = ref<string[]>([])

  // actions
  // 用户登录
  const fetchLogin = async (loginParams: LoginReqType) => {
    const {
      data: { code, data, message },
    } = await loginApi(loginParams)
    if (code === 200) {
      token.value = data.token
      // put tooken into cookie
      Cookies.set('token', token.value, { domain: 'localhost', expires: 7 })
      return 'ok'
    } else {
      return Promise.reject(new Error(message))
    }
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    const {
      data: {
        code,
        data: { userInfo: info, buttonList, routeList },
        message,
      },
    } = await getUserInfoApi()
    if (code === 200) {
      // set userInfo
      Object.assign(userInfo, info)
      // 动态路由
      const userAsyncRoutes = JSON.parse(JSON.stringify(asyncRoutes))
      const userAccessRoutes = filterAsyncRoutes(userAsyncRoutes, routeList)
      userMenuRoutes.value = [
        ...constantRoutes,
        ...userAccessRoutes,
        ...anyRoutes,
      ]
      // 注册路由至路由器
      const userRoutes = [...asyncRoutes, ...anyRoutes]
      userRoutes.forEach((route) => router.addRoute(route))
      // 保存用户按钮权限列表
      userButtonList.value = buttonList
      return 'ok'
    } else {
      return Promise.reject(new Error(message))
    }
  }

  // 安全退出
  const fetchLogout = async () => {
    const {
      data: { code, message },
    } = await logoutApi()
    if (code === 200) {
      // 退出登录
      // 清除 token
      token.value = ''
      // 清除用户信息
      Object.assign(userInfo, {
        userName: '',
        password: '',
        name: '',
        phone: '',
        avatar: '',
        description: '',
        status: 0,
      })
      // 重置路由
      userMenuRoutes.value = []
      // 重置按钮权限列表
      userButtonList.value = []
      // 清除 Cookie
      Cookies.remove('token')
      // 返回成功Promise
      return 'ok'
    } else {
      // 返回失败Promise
      return Promise.reject(new Error(message))
    }
  }

  // getters
  const getToken = () => token.value
  const getUserInfo = () => userInfo
  const getUserButtonList = () => userButtonList.value

  // return
  return {
    token,
    userInfo,
    userMenuRoutes,
    userButtonList,
    fetchLogin,
    fetchUserInfo,
    fetchLogout,
    getToken,
    getUserInfo,
    getUserButtonList,
  }
})

export default useUserStore
