// 权限管理模块数据类型定义文件
export * from './sysRole'
export * from './sysUser'

// 查询用户角色接口的数据类型
export type UserRoleInfoType = {
  /* 所有角色列表 */
  sysRoleList: SysRoleType[]
  /* 用户角色id列表 */
  userRoleIdList: number[]
}
