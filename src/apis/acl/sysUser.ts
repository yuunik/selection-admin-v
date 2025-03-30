/**
 * @file: sysUser.ts
 * @description: 系统用户相关接口
 * @author: DoooReyn <<EMAIL>>
 * @license: MIT
 */
import type { PageType, ResType } from '@/types'
import type { SysUserRoleType, SysUserSearchParams } from '@/types/acl'
import type { UserType } from '@/types/login'
import { request } from '@/utils'

// 请求地址
enum UserApi {
  // 分页查询用户信息
  PAGE_LIST_URL = '/admin/system/user/pageUserList',
  // 新增用户信息
  ADD_USER_URL = '/admin/system/user/addUser',
  // 修改用户信息
  UPDATE_USER_URL = '/admin/system/user/updateUser',
  // 删除用户信息
  DELETE_USER_URL = '/admin/system/user/deleteUser',
  // 为用户分配角色
  ASSIGN_ROLE_URL = '/admin/system/user/doAssign',
}

// 分页查询用户信息
export const pageUserListApi = (
  pageNum: number,
  pageSize: number,
  data: SysUserSearchParams,
) =>
  request<ResType<PageType<UserType[]>>>({
    url: UserApi.PAGE_LIST_URL + `/${pageNum}/${pageSize}`,
    method: 'POST',
    data,
  })

// 新增用户信息
export const addUserApi = (data: UserType) =>
  request<ResType<object>>({
    url: UserApi.ADD_USER_URL,
    method: 'POST',
    data,
  })

// 修改用户信息
export const updateUserApi = (data: UserType) =>
  request<ResType<object>>({
    url: UserApi.UPDATE_USER_URL,
    method: 'PUT',
    data,
  })

// 删除用户信息
export const deleteUserApi = (id: number) =>
  request<ResType<object>>({
    url: UserApi.DELETE_USER_URL + `/${id}`,
    method: 'DELETE',
  })

// 为用户分配角色
export const assignRoleApi = (queryParams: SysUserRoleType) =>
  request<ResType<object>>({
    url: UserApi.ASSIGN_ROLE_URL,
    method: 'POST',
    data: queryParams,
  })
