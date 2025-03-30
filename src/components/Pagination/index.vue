<script setup lang="ts">
import type { PageParamsType } from '@/types'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 接收参数类型申明
interface Props {
  // 分页参数
  queryParams: PageParamsType
  // 码或每页显示条数改变时, 获取角色列表
  handlePageChange: (currentPage: number, pageSize: number) => void
  // 显示条数
  pageSizeOptions?: number[]
}

// 定义默认参数
withDefaults(defineProps<Props>(), {
  pageSizeOptions: () => [1, 3, 5, 7, 9],
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <el-pagination
      v-model:current-page="queryParams.pageNum"
      v-model:page-size="queryParams.pageSize"
      :page-sizes="pageSizeOptions"
      size="default"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryParams.pageTotal"
      @change="handlePageChange"
      absolute-right
    />
  </el-config-provider>
</template>
