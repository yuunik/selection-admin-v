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
