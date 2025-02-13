import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

import { getUserInfoApi, loginApi } from '@/apis/login'
import type { LoginReqType } from '@/types/login'
import { GET_TOKEN } from '@/utils/token.ts'
import { SET_TOKEN } from '../../../utils'

const useUserStore = defineStore('userStore', () => {
  // state
  let token = ref(GET_TOKEN() || '')
  let userInfo = reactive({})
  let pwdErrorCount = ref(0)
  let isLogin = ref(false)

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
    SET_TOKEN(data.token)
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    const {
      data: { code, data },
    } = await getUserInfoApi()
    if (code === 208) {
      // 未登录
      ElMessage.error('请先登录')
      // 修改登录状态
      isLogin.value = false
    } else {
      // set userInfo
      Object.assign(userInfo, data)
    }
  }

  // getters
  const getToken = () => token
  const getUserInfo = () => userInfo
  const getPwdErrorCount = () => pwdErrorCount
  const getIsLogin = () => isLogin

  // return
  return {
    token,
    userInfo,
    pwdErrorCount,
    isLogin,
    fetchLogin,
    fetchUserInfo,
    getToken,
    getUserInfo,
    getPwdErrorCount,
    getIsLogin,
  }
})

export default useUserStore
