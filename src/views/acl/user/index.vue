<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import type { PageParamsType } from '@/types'
import { pageUserListApi } from '@/apis/acl'
import type { SysUserSearchParams } from '@/types/acl'
import type { UserType } from '@/types/login'

// 用户数据列表
const userTableData = ref<UserType[]>([])

// 页面分页参数
const pageParams = reactive<PageParamsType>({
  pageNum: 1,
  pageSize: 5,
  pageTotal: 0,
})

// 处理分页器变化
const handlePageChange = (currentPage: number, pageSize: number) => {
  pageParams.pageNum = currentPage
  pageParams.pageSize = pageSize
}

// 分页查询用户列表的请求参数
const queryParam = reactive<SysUserSearchParams>({
  keyword: '',
  createTimeBegin: '',
  createTimeEnd: '',
})

// 获取用户数据列表
const getUserList = async (pageNum = 1) => {
  // 默认请求第一页数据
  pageParams.pageNum = pageNum
  const {
    data: {
      code,
      data: { list, total },
    },
  } = await pageUserListApi(pageParams.pageNum, pageParams.pageSize, queryParam)
  if (code === 200) {
    // 请求成功
    userTableData.value = list
    pageParams.pageTotal = total
  }
}

// 组件挂载完成后，请求用户数据列表
getUserList()

// 创建时间
const createTime = computed({
  get: () => [queryParam.createTimeBegin, queryParam.createTimeEnd],
  set: (val) => {
    queryParam.createTimeBegin = val[0]
    queryParam.createTimeEnd = val[1]
  },
})

const handlePageUserBySearch = () => getUserList()
</script>

<template>
  <div>
    <!-- 操作区 -->
    <div class="common-style" mb20>
      <el-form inline relative>
        <el-form-item label="用户名" mb0>
          <el-input placeholder="请输入用户名" v-model="queryParam.keyword" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            type="daterange"
            start-placeholder="起始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            v-model="createTime"
          />
        </el-form-item>
        <el-form-item absolute right-0 top-0 mb0>
          <el-button
            type="primary"
            icon="Search"
            @click="handlePageUserBySearch"
          >
            搜索
          </el-button>
          <el-button type="default" icon="Refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据区 -->
    <div class="common-style pb-50!" relative>
      <!-- 新增按钮 -->
      <el-button type="primary" icon="Plus" mb12>新增</el-button>
      <!-- 数据表格 -->
      <el-table :data="userTableData" border stripe style="width: 100%">
        <el-table-column prop="id" label="id" width="80" align="center" />
        <el-table-column prop="userName" label="用户名" align="center" />
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column prop="phone" label="手机号" align="center" />
        <el-table-column prop="description" label="简介" align="center" />
        <el-table-column prop="status" label="状态" align="center" width="100">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 1 ? 'success' : 'warning'"
              size="small"
            >
              {{ row.status === 1 ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="warning" link>分配角色</el-button>
            <el-button type="primary" link>编辑</el-button>
            <el-button type="danger" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <Pagination
        :queryParams="pageParams"
        :handlePageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.common-style {
  @apply p20 shadow-default rounded-4;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
