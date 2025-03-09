/**
 * ACL API
 */

import type { PageParamsType, PageType, ResType } from '@/types'
import type { SysRoleSearchParams, SysRoleType } from '@/types/acl'
import { request } from '@/utils'

// 请求地址
enum ACL_API {
  PAGE_URL = '/admin/system/role/pageRoleList',
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
