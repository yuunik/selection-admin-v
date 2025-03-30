/**
 * role API
 */
import type { PageType, ResType } from '@/types'
import type { SysRoleSearchParams, SysRoleType } from '@/types/acl'
import { request } from '@/utils'

// 请求地址
enum ACL_API {
  PAGE_URL = '/admin/system/role/pageRoleList',
  ADD_URL = '/admin/system/role/addRole',
  DELETE_URL = '/admin/system/role/deleteRole',
  EDIT_URL = '/admin/system/role/updateRole',
}

// 分页查询用户角色列表
export const pageRoleApi = (
  pageNum: number,
  pageSize: number,
  roleName: SysRoleSearchParams,
) =>
  request<ResType<PageType<SysRoleType[]>>>({
    url: ACL_API.PAGE_URL + `/${pageNum}/${pageSize}`,
    method: 'POST',
    data: roleName,
  })

// 新增用户角色
export const addRoleApi = (role: SysRoleType) =>
  request<ResType<void>>({
    url: ACL_API.ADD_URL,
    method: 'POST',
    data: role,
  })

// 删除用户角色
export const deleteRoleApi = (id: number) =>
  request<ResType<void>>({
    url: ACL_API.DELETE_URL + `/${id}`,
    method: 'DELETE',
  })

// 修改用户角色
export const editRoleApi = (role: SysRoleType) =>
  request<ResType<void>>({
    url: ACL_API.EDIT_URL,
    method: 'PUT',
    data: role,
  })
