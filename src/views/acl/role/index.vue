<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox, ElTreeV2 } from 'element-plus'

import { SelectedMenuType, SysMenuType, type SysRoleType } from '@/types/acl'
import {
  addRoleApi,
  assignRolePermissionApi,
  deleteRoleApi,
  editRoleApi,
  getRoleMenuByRoleIdApi,
  pageRoleApi,
} from '@/apis/acl'

// 分页参数
const queryParams = reactive({
  pageNum: 1,
  pageSize: 5,
  pageTotal: 0,
})

// 角色搜索条件
const roleNameParam = reactive({
  roleName: '',
})

// 用户信息
const role = reactive<SysRoleType>({} as SysRoleType)

// 表格数据
const roleInfoData = ref<SysRoleType[]>([])

// 获取角色列表
const getRoleList = async (pageNum = 1) => {
  // 默认第一页
  queryParams.pageNum = pageNum
  const {
    data: {
      code,
      data: { list, total },
    },
  } = await pageRoleApi(
    queryParams.pageNum,
    queryParams.pageSize,
    roleNameParam,
  )
  if (code === 200) {
    // 设置表格数据
    roleInfoData.value = list
    // 设置总页数
    queryParams.pageTotal = total
  }
}

// 组件挂载完成后, 获取角色列表
onMounted(() => {
  getRoleList()
})

// 页码或每页显示条数改变时, 获取角色列表
const handlePageChange = (pageNum: number, pageSize: number) => {
  // 更新分页参数
  // queryParams.pageNum = currentPage
  queryParams.pageSize = pageSize
  // 重新渲染页面
  getRoleList(pageNum)
}

// 角色名称搜索
const handleSearch = () => {
  // 非空校验
  if (!roleNameParam.roleName) {
    return ElMessage.warning('请输入角色名称')
  }
  // 重新渲染页面
  getRoleList()
  // 清空搜索框
  roleNameParam.roleName = ''
}

// 重置搜索条件
const handleReset = () => {
  // 重置搜索条件
  roleNameParam.roleName = ''
  // 重新渲染页面
  getRoleList()
}

// 角色信息弹窗的可见性
const addRoleModalVisible = ref(false)
// 打开角色信息弹窗
const openAddRoleModal = () => {
  // 重置角色信息
  Object.assign(role, {
    id: undefined,
    roleName: '',
    roleCode: '',
    description: '',
    createTime: '',
    updateTime: '',
    isDeleted: undefined,
  } as SysRoleType)
  // 打开弹窗
  addRoleModalVisible.value = true
}

// 新增角色
const addRole = async () => {
  const {
    data: { code },
  } = await addRoleApi(role)
  if (code === 200) {
    // 成功提示
    ElMessage.success('新增成功')
    // 关闭弹窗
    addRoleModalVisible.value = false
    // 重新渲染页面
    getRoleList()
  }
}

// 编辑角色信息
const editRole = async () => {
  const {
    data: { code },
  } = await editRoleApi(role)
  if (code === 200) {
    // 成功提示
    ElMessage.success('编辑成功')
    // 关闭弹窗
    addRoleModalVisible.value = false
    // 重新渲染页面
    getRoleList()
  }
}

// 处理用户信息弹窗的保存
const handleSaveRole = () => {
  if (!role.id) {
    // 新增角色
    addRole()
  } else {
    // 更新角色
    editRole()
  }
}

// 打开编辑角色信息弹窗
const openEditRoleModal = (row: SysRoleType) => {
  // 获取角色信息
  Object.assign(role, row)
  // 打开弹窗
  addRoleModalVisible.value = true
}

// 删除角色
const handleDeleteRole = async (row: SysRoleType) => {
  try {
    await ElMessageBox.confirm(`是否确认删除角色【${row.roleName}】?`, '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
    // 确认删除
    const {
      data: { code },
    } = await deleteRoleApi(row.id as number)
    if (code === 200) {
      // 成功提示
      ElMessage.success('删除成功')
      // 重新渲染页面
      getRoleList()
    }
  } catch (err) {
    ElMessage.error('删除失败')
  }
}

// 角色权限弹窗状态
const assginRoleMenuVisible = ref(false)

const props = {
  label: 'title',
  value: 'id',
  children: 'children',
}

const menuTreeData = ref<SysMenuType[]>([])
const roleMenuIdList = ref<number[]>([])
const childrenKeys = ref<number[]>([])
const getRoleMenuList = async (roleId: number) => {
  const {
    data: {
      code,
      data: { sysMenuList, roleMenuIdList: roleMenuIds },
    },
  } = await getRoleMenuByRoleIdApi(roleId)
  if (code === 200) {
    // 菜单权限列表1
    menuTreeData.value = sysMenuList
    childrenKeys.value = filterMenuList(menuTreeData.value, [])
    // 已分配权限列表
    roleMenuIdList.value = roleMenuIds
  }
}

const selectedKeys = computed(() =>
  roleMenuIdList.value.filter((item) => childrenKeys.value.includes(item)),
)

// 获取底层菜单列表
const filterMenuList = (menuList: SysMenuType[], initArr: number[]) => {
  menuList.forEach((item) => {
    if (item.children && item.children.length === 0) {
      initArr.push(item.id as number)
    }
    if (item.children && item.children.length > 0) {
      filterMenuList(item.children, initArr)
    }
  })
  return initArr
}

const assignRoleId = ref(0)
const openAssignRoleMenuModal = (roleId: number) => {
  assignRoleId.value = roleId
  // 获取角色所有的菜单权限
  getRoleMenuList(roleId)
  // 打开弹窗
  assginRoleMenuVisible.value = true
}

const treeRef = ref<InstanceType<typeof ElTreeV2>>(
  {} as InstanceType<typeof ElTreeV2>,
)
// 为角色分配权限
const handleAssignRoleMenu = async () => {
  const checkedKey = treeRef.value.getCheckedKeys()
  const halfCheckedKey = treeRef.value.getHalfCheckedKeys()

  const checkedKeyIds: SelectedMenuType[] = checkedKey.map(
    (item) =>
      ({
        id: item,
        isHalf: 0,
      }) as SelectedMenuType,
  )
  const halfCheckedKeyIds: SelectedMenuType[] = halfCheckedKey.map(
    (item) =>
      ({
        id: item,
        isHalf: 1,
      }) as SelectedMenuType,
  )
  const allCheckedKeyIds = [...checkedKeyIds, ...halfCheckedKeyIds]
  const {
    data: { code },
  } = await assignRolePermissionApi(assignRoleId.value, allCheckedKeyIds)
  if (code === 200) {
    // 成功提示
    ElMessage.success('分配权限成功')
    // 关闭弹窗
    assginRoleMenuVisible.value = false
    // reset
    roleMenuIdList.value = []
    // 页面刷新
    window.location.reload()
  }
}
</script>

<template>
  <div>
    <!-- 搜索框 -->
    <div rounded-4 shadow-default p20>
      <el-form inline flex-between>
        <el-form-item label="角色名称" class="m-0i">
          <el-input
            placeholder="请输入角色名称"
            v-model="roleNameParam.roleName"
          />
        </el-form-item>
        <el-form-item class="m-0i">
          <el-button type="primary" icon="Search" @click="handleSearch">
            搜索
          </el-button>
          <el-button type="default" icon="Refresh" @click="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div mt20 shadow-default rounded-4 relative px20 pt20 pb40>
      <!-- 添加角色按钮 -->
      <el-button type="primary" icon="Plus" @click="openAddRoleModal">
        添加角色
      </el-button>
      <!-- 角色表格 -->
      <el-table :data="roleInfoData" border my20>
        <el-table-column
          prop="id"
          label="序号"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="roleCode"
          label="角色编码"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="description"
          label="角色描述"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }: { row: SysRoleType }">
            <el-button
              type="success"
              link
              @click="openAssignRoleMenuModal(row.id as number)"
            >
              分配权限
            </el-button>
            <el-button type="primary" link @click="openEditRoleModal(row)">
              编辑
            </el-button>
            <el-button type="danger" link @click="handleDeleteRole(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
        <!-- 空数据模板 -->
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
      <!-- 分页器 -->
      <Pagination
        :queryParams="queryParams"
        :handlePageChange="handlePageChange"
      />
    </div>
    <!-- 用户信息弹窗  -->
    <el-dialog title="新增角色" v-model="addRoleModalVisible" width="500">
      <el-form>
        <el-form-item label="角色名称" prop="roleName" label-width="100">
          <el-input v-model="role.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode" label-width="100">
          <el-input v-model="role.roleCode"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description" label-width="100">
          <el-input v-model="role.description"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleSaveRole">保存</el-button>
        <el-button @click="addRoleModalVisible = false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 用户权限弹窗 -->
    <el-dialog
      title="分配权限"
      v-model="assginRoleMenuVisible"
      width="500"
      align-center
    >
      <el-tree-v2
        style="max-width: 600px"
        :data="menuTreeData"
        :props="props"
        :height="500"
        show-checkbox
        :default-checked-keys="selectedKeys"
        ref="treeRef"
      />
      <template #footer>
        <el-button type="primary" @click="handleAssignRoleMenu">确认</el-button>
        <el-button @click="assginRoleMenuVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.m-0i {
  margin: 0 !important;
}
</style>
