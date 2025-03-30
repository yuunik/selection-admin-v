// 分页查询请求参数的数据类型
export type SysUserSearchParams = {
  keyword: string
  createTimeBegin: string
  createTimeEnd: string
}

// 为用户分配角色所需的数据类型
export type SysUserRoleType = {
  // 用户ID
  userId: number
  // 所分配的角色ID列表
  roleIdList: number[]
}
