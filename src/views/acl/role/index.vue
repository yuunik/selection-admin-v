<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

import type { SysRoleType } from '@/types/acl'
import { pageRoleApi } from '@/apis/acl'

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

// 表格数据
const roleInfoData = ref<SysRoleType[]>([])

// 获取角色列表
const getRoleList = async () => {
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
    // 成功提示
    ElMessage.success('获取角色列表成功')
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
const handlePageChange = (currentPage: number, pageSize: number) => {
  // 更新分页参数
  queryParams.pageNum = currentPage
  queryParams.pageSize = pageSize
  // 重新渲染页面
  getRoleList()
}

// 角色名称搜索
const handleSearch = () => {
  // 重新渲染页面
  getRoleList()
  // 清空搜索框
  roleNameParam.roleName = ''
}

// 重置搜索条件
const handleReset = () => {
  // 重置分页参数
  queryParams.pageNum = 1
  queryParams.pageSize = 5
  // 重置搜索条件
  roleNameParam.roleName = ''
  // 重新渲染页面
  getRoleList()
}
</script>

<template>
  <div>
    <!-- 搜索框 -->
    <div rounded-4 shadow-default p20>
      <el-form inline flex-between>
        <el-form-item label="角色名称">
          <el-input
            placeholder="请输入角色名称"
            v-model="roleNameParam.roleName"
          />
        </el-form-item>
        <el-form-item>
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
    <div mt20 shadow-default p20 rounded-4>
      <!-- 添加角色按钮 -->
      <el-button type="primary" icon="Plus">添加角色</el-button>
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
          <template #default="scope">
            <el-button type="primary" link>编辑</el-button>
            <el-button type="danger" link>删除</el-button>
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
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form-item, .el-form--inline) {
  margin: 0;
}
</style>
