<script setup lang="ts">
import { ref } from 'vue'

import { getMenuListApi } from '@/apis/acl/sysMenu'
import { SysMenuType } from '@/types/acl'

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
</script>

<template>
  <div>
    <div class="shadow-default p20 rounded-4">
      <el-button type="primary">新增权限</el-button>
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
          <el-button type="success" link icon="Plus">添加菜单</el-button>
          <el-button type="primary" link icon="Edit">编辑</el-button>
          <el-button type="danger" link icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="stylus" scoped></style>
