import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
//@ts-expect-error ts-ignore
import Cookies from 'js-cookie'

import { getUserInfoApi, loginApi } from '@/apis/login'
import type { LoginReqType } from '@/types/login'

const useUserStore = defineStore('userStore', () => {
  // state
  let token = ref(Cookies.get('token') || '')
  let userInfo = reactive({})

  // actions
  // 用户登录
  const fetchLogin = async (loginParams: LoginReqType) => {
    const {
      data: { code, data, message },
    } = await loginApi(loginParams)
    if (code === 200) {
      token.value = data.token
      // put tooken into cookie
      Cookies.set('token', token.value, { domain: 'localhost', expire: 7 })
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
      userInfo = data
    } else {
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
    fetchLogin,
    fetchUserInfo,
    getToken,
    getUserInfo,
  }
})

export default useUserStore
