/**
 * @file: sysMenu.ts
 */
import type { ResType } from '@/types'
import type { SysMenuType } from '@/types/acl'
import { request } from '@/utils'

// 请求地址管理
enum MenuApi {
  // 获取菜单列表
  GET_MENU_LIST = '/admin/system/menu/getMenuList',
}

// 获取菜单列表
export const getMenuListApi = () =>
  request<ResType<SysMenuType[]>>({
    url: MenuApi.GET_MENU_LIST,
    method: 'get',
  })
