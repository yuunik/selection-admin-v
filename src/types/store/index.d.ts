/**
 * 用户状态管理库状态类型申明
 */

import type { RouteRecordRaw } from 'vue-router'
import type { UserType } from '../login'

export type UserStateType = {
  // 用户令牌
  token: string
  // 用户信息
  userInfo: UserType
  // 用户菜单权限
  userMenuRoutes: RouteRecordRaw[]
}
