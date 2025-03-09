// 定义返回数据类型
export type ResType<T> = {
  // 状态码
  code: number
  // 状态信息
  message: string
  // 返回数据
  data: T
}

// 分页数据类型
export type PageType<T> = {
  total: number
  list: T
  pageNum: number
  pageSize: number
  size: number
  startRow: number
  endRow: number
  pages: number
  prePage: number
  nextPage: number
  isFirstPage: boolean
  isLastPage: boolean
  hasPreviousPage: boolean
  hasNextPage: boolean
  navigatePages: number
  navigatepageNums: number[]
  navigateFirstPage: number
  navigateLastPage: number
}

// 分页请求参数类型
export type PageParamsType = {
  pageNum: number
  pageSize: number
  pageTotal: number
}
