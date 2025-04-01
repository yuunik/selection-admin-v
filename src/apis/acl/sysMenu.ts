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
  // 添加菜单
  ADD_MENU = '/admin/system/menu/addMenu',
  // 修改菜单
  UPDATE_MENU = '/admin/system/menu/updateMenu',
  // 删除菜单
  DELETE_MENU = '/admin/system/menu/deleteMenu',
}

// 获取菜单列表
export const getMenuListApi = () =>
  request<ResType<SysMenuType[]>>({
    url: MenuApi.GET_MENU_LIST,
    method: 'get',
  })

// 添加菜单
export const addMenuApi = (data: SysMenuType) =>
  request<ResType<object>>({
    url: MenuApi.ADD_MENU,
    method: 'POST',
    data,
  })

// 修改菜单
export const updateMenuApi = (data: SysMenuType) =>
  request<ResType<object>>({
    url: MenuApi.UPDATE_MENU,
    method: 'PUT',
    data,
  })

// 删除菜单
export const deleteMenuApi = (id: number) =>
  request<ResType<object>>({
    url: `${MenuApi.DELETE_MENU}/${id}`,
    method: 'DELETE',
  })
