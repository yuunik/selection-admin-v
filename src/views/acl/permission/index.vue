<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import {
  addMenuApi,
  deleteMenuApi,
  getMenuListApi,
  updateMenuApi,
} from '@/apis/acl'
import type { SysMenuType } from '@/types/acl'

// 权限数据列表
const menuTableData = ref<SysMenuType[]>([])

// 获取权限列表
const getMenuList = async () => {
  const {
    data: { code, data },
  } = await getMenuListApi()
  if (code === 200) {
    // 设置权限列表
    menuTableData.value = data
  }
}

// 组件创建后, 自动获取权限列表
getMenuList()

// 菜单表单状态
const menuDialogVisible = ref(false)

// 菜单表单数据
const menuFormData = reactive<SysMenuType>({
  title: '',
  component: '',
  sortValue: undefined,
  status: undefined,
})

// 打开添加菜单弹窗
const openAddMenuDialog = () => {
  // 重置表单数据
  Object.assign(menuFormData, {
    id: undefined,
    title: '',
    component: '',
    sortValue: undefined,
    status: undefined,
    children: [],
    createTime: '',
    updateTime: '',
    isDeleted: undefined,
    parentId: undefined,
  } as SysMenuType)
  // 设置父菜单ID
  menuFormData.parentId = 0
  // 打开弹窗
  menuDialogVisible.value = true
}

// 打开添加子菜单弹窗
const openAddChildrenMenu = (id: number) => {
  // 重置表单数据
  Object.assign(menuFormData, {
    id: undefined,
    title: '',
    component: '',
    sortValue: undefined,
    status: undefined,
    children: [],
    createTime: '',
    updateTime: '',
    isDeleted: undefined,
    parentId: undefined,
  } as SysMenuType)
  // 设置父菜单ID
  menuFormData.parentId = id
  // 打开弹窗
  menuDialogVisible.value = true
}

// 提交
const handleAddMenu = async () => {
  const {
    data: { code },
  } = await addMenuApi(menuFormData)
  if (code === 200) {
    // 关闭弹窗
    menuDialogVisible.value = false
    // 刷新权限列表
    getMenuList()
  }
}

// 打开编辑菜单弹窗
const openEditMenu = (menu: SysMenuType) => {
  // 数据回显
  Object.assign(menuFormData, menu)
  // 打开弹窗
  menuDialogVisible.value = true
}

// 编辑菜单
const handleEditMenu = async () => {
  const {
    data: { code },
  } = await updateMenuApi(menuFormData)
  if (code === 200) {
    // 关闭弹窗
    menuDialogVisible.value = false
    // 刷新权限列表
    getMenuList()
  }
}

// 删除菜单
const handleDeleteMenu = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定删除该菜单吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    // 发起删除请求
    const {
      data: { code },
    } = await deleteMenuApi(id)
    if (code === 200) {
      // 刷新权限列表
      getMenuList()
    }
  } catch {
    ElMessage.info('删除失败')
  }
}

// 添加子菜单
const handleAddChildrenMenu = () => {}

// 提交菜单
const handleSubmitMenu = () => {
  if (menuFormData.id) {
    // 编辑菜单
    handleEditMenu()
  } else if (menuFormData.parentId) {
    // 添加子菜单
    handleAddChildrenMenu()
  } else {
    // 添加菜单
    handleAddMenu()
  }
}
</script>

<template>
  <div>
    <div class="shadow-default p20 rounded-4">
      <el-button type="primary" @click="openAddMenuDialog">新增权限</el-button>
    </div>
    <!-- 权限表格 -->
    <el-table
      :data="menuTableData"
      border
      w-full
      shadow-default
      rounded-4
      mt20
      row-key="id"
      :default-sort="{ prop: 'sortValue', order: 'ascending' }"
    >
      <el-table-column prop="title" label="菜单标题" align="center" />
      <el-table-column prop="component" label="路由名称" align="center" />
      <el-table-column prop="sortValue" label="排序" align="center" sortable />
      <el-table-column prop="status" label="状态" align="center">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="success"
            link
            icon="Plus"
            @click="openAddChildrenMenu(row.id)"
          >
            添加菜单
          </el-button>
          <el-button type="primary" link icon="Edit" @click="openEditMenu(row)">
            编辑
          </el-button>
          <el-button
            type="danger"
            link
            icon="Delete"
            @click="handleDeleteMenu(row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 菜单表单 -->
    <el-dialog
      v-model="menuDialogVisible"
      title="添加菜单"
      align-center
      width="520"
    >
      <el-form label-width="80px">
        <el-form-item label="菜单标题">
          <el-input v-model="menuFormData.title" placeholder="请输入菜单标题" />
        </el-form-item>
        <el-form-item label="路由名称">
          <el-input
            v-model="menuFormData.component"
            placeholder="请输入路名名称"
          />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="menuFormData.sortValue" value="1" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="menuFormData.status">
            <el-radio :value="1">正常</el-radio>
            <el-radio :value="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="default" @click="menuDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSubmitMenu">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="stylus" scoped></style>
