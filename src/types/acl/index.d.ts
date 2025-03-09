// 权限管理模块数据类型定义文件

// 用户角色类型
export type SysRoleType = {
  // 角色id
  id: number
  // 角色创建时间
  createTime: string
  // 角色更新时间
  updateTime: string
  // 角色是否删除
  isDeleted: number
  // 角色名称
  roleName: string
  // 角色编码
  roleCode: string
  // 角色描述
  description: string
}

// 角色搜索条件类型
export type SysRoleSearchParams = {
  // 角色名称
  roleName?: string
}
