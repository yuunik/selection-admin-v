import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import { loginApi } from '@/apis/login'
import type { LoginReqType } from '@/types/login'

const useUserStore = defineStore('userStore', () => {
  // state
  let token = ref('')
  const userInfo = reactive({})
  let pwdErrorCount = ref(0)

  // actions
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
