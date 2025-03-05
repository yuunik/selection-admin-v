// 登录请求参数类型
export type LoginReqType = {
  // 用户名
  userName: string
  // 密码
  password: string
  // 验证码key
  codeKey?: string
  // 验证码
  captcha?: string
}

// 登录响应参数类型
export type LoginResType = {
  // 令牌
  token: string
  // 刷新令牌,可以为空
  refreshToken?: string
}

// 验证码参数类型
export type CaptchaType = {
  // 验证码 key
  codeKey: string
  // 验证码图片 base64 编码
  codeValue: string
}

// 用户信息参数类型
export type UserType = {
  // 用户 id
  id: string
  // 用户名
  userName: string
  // 密码
  password: string
  // 昵称
  name: string
  // 手机号码
  phone: string
  // 头像
  avatar: string
  // 描述
  description: string
  // 用户状态(1:正常,0:停用)
  status: number
}
