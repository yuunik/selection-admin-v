/**
 * @file: sysUser.ts
 * @description: 系统用户相关接口
 * @author: DoooReyn <<EMAIL>>
 * @license: MIT
 */
import type { PageType, ResType } from '@/types'
import type { SysUserSearchParams } from '@/types/acl'
import type { UserType } from '@/types/login'
import { request } from '@/utils'

// 请求地址
enum UserApi {
  // 分页查询用户信息
  PAGE_LIST_URL = '/admin/system/user/pageUserList',
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
