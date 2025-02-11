import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import { getUserInfoApi, loginApi } from '@/apis/login'
import type { LoginReqType } from '@/types/login'

const useUserStore = defineStore('userStore', () => {
  // state
  let token = ref('')
  let userInfo = reactive({})
  let pwdErrorCount = ref(0)

  // actions
  // 用户登录
  const fetchLogin = async (loginParams: LoginReqType) => {
    const {
      data: { code, data },
    } = await loginApi(loginParams)
    if (code === 201) {
      // 添加错误次数
      pwdErrorCount.value++
    }
    // set token
    token.value = data.token
    // get userInfo
    await fetchUserInfo()
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    const {
      data: { data },
    } = await getUserInfoApi()
    // set userInfo
    userInfo = data
  }

  // getters
  const getToken = () => token
  const getUserInfo = () => userInfo
  const getPwdErrorCount = () => pwdErrorCount

  // return
  return {
    token,
    userInfo,
    pwdErrorCount,
    fetchLogin,
    getToken,
    getUserInfo,
    getPwdErrorCount,
  }
})

export default useUserStore
