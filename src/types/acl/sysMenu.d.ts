/**
 * 系统菜单类型
 */

// 菜单类型
export type SysMenuType = {
  // 菜单ID
  id?: number
  // 菜单创建时间
  createTime?: string
  // 菜单更新时间
  updateTime?: string
  // 是否删除
  isDeleted?: number
  // 父菜单ID
  parentId?: number
  // 菜单名称
  title: string
  // 路由名称
  component: string
  // 排序
  sortValue: number | undefined
  // 菜单状态
  status: number | undefined
  // 菜单子项
  children?: SysMenuType[]
  // 菜单层级
  level: number
}
