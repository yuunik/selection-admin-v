import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import Cookies from 'js-cookie'
import type { RouteRecordRaw } from 'vue-router'

import { getUserInfoApi, loginApi, logoutApi } from '@/apis/login'
import type { LoginReqType, UserType } from '@/types/login'
import constantRoutes from '@/router/routes'

const useUserStore = defineStore('userStore', () => {
  // state
  let token = ref<string>(Cookies.get('token') || '')
  let userInfo = reactive<UserType>({
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
      data: { code, data, message },
    } = await getUserInfoApi()
    if (code === 200) {
      // set userInfo
      Object.assign(userInfo, data)
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
      // 清除用户信息
      token.value = ''
      Object.assign(userInfo, {
        userName: '',
        password: '',
        name: '',
        phone: '',
        avatar: '',
        description: '',
        status: 0,
      })
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
  const getToken = () => token
  const getUserInfo = () => userInfo

  // return
  return {
    token,
    userInfo,
    userMenuRoutes,
    fetchLogin,
    fetchUserInfo,
    fetchLogout,
    getToken,
    getUserInfo,
  }
})

export default useUserStore
