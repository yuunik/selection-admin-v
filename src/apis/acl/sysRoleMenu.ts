import type { ResType } from '@/types'
import type { RoleMenuInfoType, SelectedMenuType } from '@/types/acl'
import { request } from '@/utils'

enum SysRoleMenuApi {
  // 根据用户id查询所有菜单及用户所具有的菜单权限
  GET_MENU_BY_ROLE_ID = '/admin/system/sysRoleMenu/getMenuByRoleId',
  // 为角色分配权限
  ASSIGN_PERMISSION_TO_ROLE = '/admin/system/sysRoleMenu/doAssignForMenu',
}

// 根据用户id查询所有菜单及用户所具有的菜单权限
export const getRoleMenuByRoleIdApi = async (roleId: number) =>
  request<ResType<RoleMenuInfoType>>({
    url: SysRoleMenuApi.GET_MENU_BY_ROLE_ID + `/${roleId}`,
    method: 'GET',
  })

// 为角色分配权限
export const assignRolePermissionApi = async (
  roldId: number,
  menuIdList: SelectedMenuType[],
) =>
  request<ResType<object>>({
    url: SysRoleMenuApi.ASSIGN_PERMISSION_TO_ROLE,
    method: 'POST',
    data: {
      roleId: roldId,
      menuIdList: menuIdList,
    },
  })
