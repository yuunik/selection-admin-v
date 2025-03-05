import { request } from '@/utils'
import type {
  CaptchaType,
  LoginReqType,
  LoginResType,
  UserType,
} from '@/types/login'
import type { ResType } from '@/types'

// 请求地址管理
enum LoginApi {
  LOGIN_URL = '/admin/system/index/login',
  GET_VALIDATE_CODE = '/admin/system/index/getValidateCode',
  GET_USER_INFO = '/admin/system/index/getUserInfo',
  LOGOUT_URL = '/admin/system/index/logout',
}

// 用户登录
export const loginApi = (data: LoginReqType) =>
  request<ResType<LoginResType>>({
    url: LoginApi.LOGIN_URL,
    method: 'post',
    data,
  })

// 生成验证码
export const generateCaptchaApi = () =>
  request<ResType<CaptchaType>>({
    url: LoginApi.GET_VALIDATE_CODE,
    method: 'get',
  })

// 获取用户信息
export const getUserInfoApi = () =>
  request<ResType<UserType>>({
    url: LoginApi.GET_USER_INFO,
    method: 'get',
  })

// 用户安全退出
export const logoutApi = () =>
  request<ResType<any>>({
    url: LoginApi.LOGOUT_URL,
    method: 'get',
  })
