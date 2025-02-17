// 定义返回数据类型
export type ResType<T> = {
  // 状态码
  code: number
  // 状态信息
  message: string
  // 返回数据
  data: T
}
