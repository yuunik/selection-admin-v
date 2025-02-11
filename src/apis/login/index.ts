import { request } from '@/utils'
import type { CaptchaType, LoginReqType, LoginResType } from '@/types/login'
import type { ResType } from '@/types'

// 请求地址管理
enum LoginApi {
  LOGIN = '/admin/system/index/login',
  GET_VALIDATE_CODE = '/admin/system/index/getValidateCode',
}

// 用户登录
export const loginApi = (data: LoginReqType) =>
  request<ResType<LoginResType>>({
    url: LoginApi.LOGIN,
    method: 'post',
    data,
  })

// 生成验证码
export const generateCaptchaApi = () =>
  request<ResType<CaptchaType>>({
    url: LoginApi.GET_VALIDATE_CODE,
    method: 'get',
  })
