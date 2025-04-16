import { SysMenuType } from './sysMenu'

// 权限管理模块数据类型定义文件
export * from './sysRole'
export * from './sysUser'
export * from './sysMenu'

// 查询用户角色接口的数据类型
export type UserRoleInfoType = {
  /* 所有角色列表 */
  sysRoleList: SysRoleType[]
  /* 用户角色id列表 */
  userRoleIdList: number[]
}

// 选中的菜单id的集合类型
export type SelectedMenuType = {
  /* 菜单id */
  id: number
  /* 是否半选 */
  isHalf: number
}

// 根据用户id查询所有菜单及用户所具有的菜单权限接口的数据类型
export type RoleMenuInfoType = {
  /* 所有菜单列表 */
  sysMenuList: SysMenuType[]
  /* 用户具有的菜单权限id列表 */
  roleMenuIdList: number[]
}
